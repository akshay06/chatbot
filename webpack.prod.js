const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const dependencies = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const SERVICE_WORKER_IGNORE_PATTERNS = [/dist\/.*\.html/]; //Eliminating from Precache
const VENDOR_LIBS = [];

const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const fs = require('fs');

Object.entries(dependencies['dependencies']).forEach(([key, value]) => {
    VENDOR_LIBS.push(key);
});

var cache = 0;

var processEnv = {};
for (env in process.env) {
    processEnv[env] = JSON.stringify(process.env[env])
}

const PUBLIC_PATH = '/';

var className = (function () {
    let index = 0;
    let classesMap = {};

    var x = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'.split('');
    var length = x.length;

    var chars = [];
    for (i = 0; i < 100000; i++) {
        var value = '';

        var D = Math.floor(i / length);
        var M = i % length;
        value = x[M];

        while (D > length) {
            var Z = D - 1;
            D = Math.floor(Z / length);
            M = Z % length;
            value = x[M] + value
        }

        if (D != 0) value = x[D - 1] + value;

        chars.push(value);
    }

    function write() {
        fs.writeFileSync(__dirname + "/.tmp/classesMap.json", JSON.stringify(classesMap), 'utf8');
    }
    return {
        get: function (context) {
            if (!classesMap[context]) {
                classesMap[context] = chars[index];
                index++;
                write();
            }
            //console.log(context,'--',chars[index])            
            return classesMap[context];
        },
        getClassesMap: function () {
            return classesMap;
        }
    }
})();

module.exports = {
    entry: {
        main: './src/index.tsx'
    },
    output: {
        filename: '[name].[chunkhash].js',
        publicPath: PUBLIC_PATH,
        path: __dirname + "/tmp_dist"
    },
    module: {
        rules: [{
            test: /\.scss$/i,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 1,
                        modules: true,
                        camelCase: true,
                        //localIdentName: '[hash:base64:6]',
                        getLocalIdent: (context, localIdentName, localName, options) => {
                            return '_' + className.get(localName + context._module.resource);
                        },
                        minimize: true,
                        namedExport: true,
                        sass: true
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => ([
                            //require("postcss-import")(),                                
                            //require("cssnano")(),
                            // Following CSS Nesting Module Level 3: http://tabatkins.github.io/specs/css-nesting/
                            //require("postcss-nesting")(),
                            //require("postcss-custom-properties")(),
                            //https://github.com/ai/browserslist
                            require("autoprefixer")({
                                browsers: ['last 2 versions', 'ie >= 9']
                            })
                        ])
                    }
                },
                {
                    loader: "sass-loader" // compiles Sass to CSS
                }
                ]
            })
        }, {
            test: /\.(ts|tsx)$/,
            use: ['awesome-typescript-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
            // exclude: /node_modules/,
            loader: 'file-loader?limit=1024&name=fonts/[name].[ext]'
        }, {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }, {
            test: /\.(gif|jpe?g|png|ico)$/,
            loader: ["file-loader?name=images/[name].[ext]&limit=100000"]
        }]
    },
    devtool: "nosources-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
    },
    plugins: [
        // new webpack.WatchIgnorePlugin([
        //     /css\.d\.ts$/
        // ]),
        new CleanWebpackPlugin(['tmp_dist']),
        // new CopyWebpackPlugin([{ from: path.join(__dirname, 'assets'), to: path.join(__dirname, 'tmp_dist/assets') },
        // { from: path.join(__dirname, 'assets/root'), to: path.join(__dirname, 'tmp_dist') }]),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new SimpleProgressPlugin(),
        new LodashModuleReplacementPlugin(),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            uglifyOptions: {               
                compress: {
                    // sequences: true, // join consecutive statements with the “comma operator”
                    // properties: true, // optimize property access: a["foo"] → a.foo
                    // dead_code: true, // discard unreachable code
                    // drop_debugger: true, // discard “debugger” statements
                    // unsafe: false, // some unsafe optimizations (see below)
                    // conditionals: true, // optimize if-s and conditional expressions
                    // comparisons: true, // optimize comparisons
                    // evaluate: true, // evaluate constant expressions
                    // booleans: true, // optimize boolean expressions
                    // loops: true, // optimize loops
                    // unused: true, // drop unused variables/functions
                     hoist_funs: true, // hoist function declarations
                    // hoist_vars: false, // hoist variable declarations
                    // if_return: true, // optimize if-s followed by return/continue
                    // join_vars: true, // join var declarations
                    // cascade: true, // try to cascade `right` into `left` in sequences
                    // side_effects: true, // drop side-effect-free statements
                    // warnings: false, // warn about potentially dangerous optimizations/code
                    // screw_ie8: true,
                    // output: {
                    //     comments: false
                    // },
                    global_defs: {
                        __REACT_HOT_LOADER__: undefined // eslint-disable-line no-undefined
                    }
                }
            },
            extractComments:true,
            sourceMap: true,
            
        }),            
        new webpack.optimize.AggressiveMergingPlugin(),
        //  new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          filename: 'index.html',
          inject: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendor'],
        //     minChunks: ({ resource }) => /node_modules/.test(resource), // vendor: creates vendor.js, manifest: whether dependencies have been modified
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest'
        // }),
        new webpack.DefinePlugin({
            'process.env': processEnv,
            'BROWSER': true,
            'DEBUG': false,
            '__DEVTOOLS__': false
        }),
        new ExtractTextPlugin({
            filename: 'style.[contenthash].css', // create a single css file 
            allChunks: true
        }),
        // new ScriptExtHtmlWebpackPlugin({
        //     defaultAttribute: 'defer' //defer or async
        // }),
        new SWPrecacheWebpackPlugin({
            filename: 'service-worker.js',
            staticFileGlobsIgnorePatterns: SERVICE_WORKER_IGNORE_PATTERNS,
            staticFileGlobs: [
                'src/images/**.*'
            ],
            stripPrefix: 'src/static/', // stripPrefixMulti is also supported 
            mergeStaticsConfig: true, // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config 
            staticFileGlobsIgnorePatterns: [/\.map$/], // use this to ignore sourcemap files 
        }),
        new StatsWriterPlugin({
            filename: "stats.json" // Default
        }),
        new BundleAnalyzerPlugin({
            // Can be `server`, `static` or `disabled`.
            // In `server` mode analyzer will start HTTP server to show bundle report.
            // In `static` mode single HTML file with bundle report will be generated.
            // In `disabled` mode you can use this plugin to just generate
            // Webpack Stats JSON file by setting `generateStatsFile` to `true`.
            analyzerMode: 'static',
            // Port that will be used by in `server` mode to start HTTP server.
            analyzerPort: 8888,
            // Path to bundle report file that will be generated in `static` mode.
            // If relative path is provided, it will be relative to bundles output directory
            reportFilename: 'ui-report.html',
            // Automatically open report in default browser
            openAnalyzer: true,
            // If `true`, Webpack Stats JSON file will be generated in bundles output directory
            generateStatsFile: false,
            // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
            // Relative to bundles output directory.
            statsFilename: 'ui-stats.json',
        }),
    ],
    performance: { // showing errors if size of build increases
        hints: "error",
        maxAssetSize: 250000
    }
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};
