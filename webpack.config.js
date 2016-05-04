var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = (function () {
    var rootPath = path.join(__dirname, './');
    return {
        root: rootPath,
        nodeModules: path.join(rootPath, './node_modules/'),
        src: path.join(rootPath, './frontend'),
        output: path.join(rootPath, './.tmp/dist')
    };
})();

module.exports = {
    entry: {
        bundle: [
            path.join(paths.nodeModules, '/normalize.css/normalize.css'),
            path.join(paths.nodeModules, '/font-awesome/css/font-awesome.css'),
            path.join(paths.src, '/css/index.scss'),
            path.join(paths.src, '/js/index.js')
        ],
        vendor: ['babel-polyfill']
    },
    output: {
        path: paths.output,
        filename: 'assets/js/[name].js',
    },
    module: {
        loaders: [
                {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css!sass?sourceMap&includePaths[]=' + paths.nodeModules
                )
            },
            {
                test: /\/font-awesome\/.+\.(woff|woff2|ttf|eot|svg)(\?.+)?$/,
                loader: 'file?name=/assets/css/[hash].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('assets/css/bundle.css')
    ]
};
