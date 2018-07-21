const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const dependencies = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = [];
Object.entries(dependencies['dependencies']).forEach(([key, value]) => {
    VENDOR_LIBS.push(key);
});

var cache = 0;


var processEnv = {};
for (env in process.env) {
    processEnv[env] = JSON.stringify(process.env[env])
}


module.exports = {
    entry: {
        hot_loader: 'react-hot-loader/patch', // not sure whether to include this in production build
        client: 'webpack-hot-middleware/client', // not sure whether to include this in production build
        bundle: './src/index.tsx',
        vendor: VENDOR_LIBS
    },
    output: {
        filename: '[name].js',
        publicPath: "/",
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
                        //    sourceMap: true,
                        importLoaders: 1,
                        modules: true,
                        camelCase: true,
                        //localIdentName: '[name]_[local]',
                        getLocalIdent: (context, localIdentName, localName, options) => {
                            let resource = context._module.resource.split('/');
                            let resourceClass = resource[resource.length - 1].split('.')[0]
                            return '_' + resourceClass + '_' + localName
                        },
                        //minimize: true,
                        namedExport: true,
                        sass: true
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => ([
                            require("autoprefixer")({
                                browsers: ['last 2 versions', 'ie >= 9']
                            })
                        ])
                    }
                }, {
                    loader: 'sass-loader',
                },
                ]
            })
        }, {
            test: /\.(ts|tsx)$/,
            use: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(gif|jpe?g|png|ico)$/,
            loader: ["file-loader?name=images/[name].[ext]&limit=100000"]
        }, {
            test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
            // exclude: /node_modules/,
            loader: 'file-loader?limit=1024&name=fonts/[name].[ext]'
        }]
    },
    // devtool: "source-map",
    resolve: {
        alias: {
        images: path.resolve(__dirname, 'src/images'),
        },
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
    },

    plugins: [
        new webpack.WatchIgnorePlugin([
            /css\.d\.ts$/
        ]),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new SimpleProgressPlugin(),
       // new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'], // vendor: creates vendor.js, manifest: whether dependencies have been modified
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development'),
            },
            'BROWSER': true
        }),
        new ExtractTextPlugin({
            filename: '[name].css', // create a single css file 
            allChunks: true,
            disable: true, //HMR for sass files Only in development mode
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './src',
        hot: true
    },
    // performance: { // showing errors if size of build increases
    //     hints: "warning",
    //     maxAssetSize: 250000
    // }
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};