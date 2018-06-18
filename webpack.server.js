const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const dependencies = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
var WrapperPlugin = require('wrapper-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

const fs = require('fs');

const SERVICE_WORKER_IGNORE_PATTERNS = [/dist\/.*\.html/]; //Eliminating from Precache
const VENDOR_LIBS = [];

var classNames = JSON.parse(fs.readFileSync(__dirname + '/.tmp/classesMap.json', 'utf8'));

Object.entries(dependencies['dependencies']).forEach(([key, value]) => {
    VENDOR_LIBS.push(key);
});

const PUBLIC_PATH = '/';

var processEnv = {};
for (env in process.env) {
    processEnv[env] = JSON.stringify(process.env[env])
}

module.exports = {
    entry: {
        main: './production-server.tsx'
    },
    output: {
        filename: 'production-server.js',
        publicPath: PUBLIC_PATH,
        path: __dirname + "/dist"
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
                        localIdentName: '[hash:base64:5]',
                        minimize: true,
                        namedExport: true,
                        sass: true,
                        getLocalIdent: (context, localIdentName, localName, options) => {
                            if (localName.indexOf('icon_') != -1) {
                                return localName
                            }

                            if (context._module.resource.indexOf('Bootstrap.scss') != -1) {
                                return localName
                            }

                            if (context._module.resource.indexOf('common.scss') != -1) {
                                return localName
                            }

                            return '_' + classNames[localName + context._module.resource];
                        },
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => ([
                            //require("postcss-import")(),
                            // Following CSS Nesting Module Level 3: http://tabatkins.github.io/specs/css-nesting/
                            //require("postcss-nesting")(),
                            //require("postcss-custom-properties")(),
                            //https://github.com/ai/browserslist
                            require("autoprefixer")({
                                browsers: ['last 2 versions', 'ie >= 9']
                            })
                        ])
                    }
                }, {
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
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
    },
    plugins: [
        new webpack.WatchIgnorePlugin([
            /css\.d\.ts$/
        ]),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{ from: path.join(__dirname, 'tmp_dist'), to: path.join(__dirname, 'dist') }]),
        new webpack.NoEmitOnErrorsPlugin(),
        new SimpleProgressPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         sequences: true, // join consecutive statements with the “comma operator”
        //         properties: true, // optimize property access: a["foo"] → a.foo
        //         dead_code: true, // discard unreachable code
        //         drop_debugger: true, // discard “debugger” statements
        //         unsafe: false, // some unsafe optimizations (see below)
        //         conditionals: true, // optimize if-s and conditional expressions
        //         comparisons: true, // optimize comparisons
        //         evaluate: true, // evaluate constant expressions
        //         booleans: true, // optimize boolean expressions
        //         loops: true, // optimize loops
        //         unused: true, // drop unused variables/functions
        //         hoist_funs: true, // hoist function declarations
        //         hoist_vars: false, // hoist variable declarations
        //         if_return: true, // optimize if-s followed by return/continue
        //         join_vars: true, // join var declarations
        //         cascade: true, // try to cascade `right` into `left` in sequences
        //         side_effects: true, // drop side-effect-free statements
        //         warnings: false, // warn about potentially dangerous optimizations/code
        //         screw_ie8: true,
        //         global_defs: {
        //             __REACT_HOT_LOADER__: undefined // eslint-disable-line no-undefined
        //         }
        //     },
        //     sourceMap: true,
        //     output: {
        //         comments: false
        //     }
        // }),
        new webpack.optimize.AggressiveMergingPlugin(),
        //  new webpack.optimize.DedupePlugin(),
        // new HtmlWebpackPlugin({
        //   template: 'bundle.html',
        //   filename: 'index.html',
        //   inject: true
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendor'],
        //     minChunks: ({ resource }) => /node_modules/.test(resource), // vendor: creates vendor.js, manifest: whether dependencies have been modified
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest'
        // }),
        new webpack.DefinePlugin({
            'process.env': processEnv,
            'BROWSER': false,
            'DEBUG': false,                                 // Doesn´t have effect on my example
            '__DEVTOOLS__': false                           // Doesn´t have effect on my example
        }),
        new ExtractTextPlugin({
            filename: 'style.[contenthash].css', // create a single css file 
            allChunks: true
        }),
        new WrapperPlugin({
            test: /\.js$/,
            header: "var newrelic = require('newrelic');"
        }),
        // new ScriptExtHtmlWebpackPlugin({
        //     defaultAttribute: 'defer' //defer or async
        // }),
        // new SWPrecacheWebpackPlugin({
        //     cacheId: 'Bewakoof-Admin',
        //     filename: 'service-worker.js',
        //     staticFileGlobsIgnorePatterns: SERVICE_WORKER_IGNORE_PATTERNS,
        //     staticFileGlobs: [
        //         'src/images/**.*'
        //     ],
        //     stripPrefix: 'src/static/', // stripPrefixMulti is also supported 
        //     mergeStaticsConfig: true, // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config 
        //     staticFileGlobsIgnorePatterns: [/\.map$/], // use this to ignore sourcemap files 
        // }),
        // new StatsWriterPlugin({
        //     filename: "stats.json" // Default
        // }),
        // new BundleAnalyzerPlugin({
        //     // Can be `server`, `static` or `disabled`.
        //     // In `server` mode analyzer will start HTTP server to show bundle report.
        //     // In `static` mode single HTML file with bundle report will be generated.
        //     // In `disabled` mode you can use this plugin to just generate
        //     // Webpack Stats JSON file by setting `generateStatsFile` to `true`.
        //     analyzerMode: 'static',
        //     // Port that will be used by in `server` mode to start HTTP server.
        //     analyzerPort: 8888,
        //     // Path to bundle report file that will be generated in `static` mode.
        //     // If relative path is provided, it will be relative to bundles output directory
        //     reportFilename: 'ui-report.html',
        //     // Automatically open report in default browser
        //     openAnalyzer: true,
        //     // If `true`, Webpack Stats JSON file will be generated in bundles output directory
        //     generateStatsFile: false,
        //     // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
        //     // Relative to bundles output directory.
        //     statsFilename: 'ui-stats.json',
        // }),
    ],
    performance: { // showing errors if size of build increases
        hints: "error",
        maxAssetSize: 250000
    },
    target: 'node',
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: [{
        "newrelic": true,       
        //  "react-dom": "ReactDOM"
    }, nodeExternals()],

    // watch:true,
    // watchOptions:{
    //     ignored: /node_modules/,
    // }    
};
