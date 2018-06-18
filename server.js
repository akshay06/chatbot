const path = require("path");
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var compression = require('compression');
var DashboardPlugin = require('webpack-dashboard/plugin');

var app = express();

const logger = require('morgan');
app.use(logger('dev'));

if (process.env.NODE_ENV === "production") {
    var webpackConfig = require('./webpack.prod');
    var compiler = webpack(webpackConfig);

    compiler.run(function(err, stats) {
        if (err) {
            console.log(err);
        } else {
            var webpackConfig = require('./webpack.server');
            var compiler = webpack(webpackConfig);
            compiler.run(function(err, stats) {
                if (err) {
                    console.log(err);
                } else {
                    process.exit();
                }
            });
        }
    });
} else {
    var webpackConfig = require('./webpack.dev');
    var compiler = webpack(webpackConfig);
   // compiler.apply(new DashboardPlugin());
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            quiet: true
        }
    }));
    //app.use('/blog', express.static(__dirname + '/'));
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));

    app.get('/*', function(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '/src') });
    });

    app.listen(4000, function() {
        console.log("Listening on port 4000!");
    });
}
