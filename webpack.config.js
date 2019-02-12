const path = require('path');
const webpack = require('webpack');
const assembleWebpack = require('assemble-webpack');
const handlebarsHelpers = require('handlebars-helpers');

module.exports = {
    mode: 'development',
    entry: {
        main: [
            'webpack-hot-middleware/client',
            path.join(__dirname, '/app/main.js')
        ],
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: 'http://localhost:9000/assets/scripts'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(hbs)$/,
                use: {
                    loader: 'assemble-webpack'
                }
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            },
            {
                test: /.*\.(gif|png|jpe?g|svg|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new assembleWebpack.AttachedPlugin({
            baseLayout: ['./app/layouts/**/*.hbs'],
            basePages: ['./app/pages/**/*.hbs'],
            partialsLayout: ['./app/components/**/*.hbs'],
            partialsData: [
              './app/components/**/*.json',
              './app/pages/**/*.json'
            ],
            helpers: [handlebarsHelpers(), './app/helpers/helpers.js']
        })
    ]
};
