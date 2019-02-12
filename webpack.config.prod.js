'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const assembleWebpack = require('assemble-webpack');
const handlebarsHelpers = require('handlebars-helpers');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');


/*--
 Webpack Production build configuration

 - entry: Define the entry files
 - output: Define the output of the files
 - devtool: Developer tool to enhance debugging with sourcemaps
 - module: Define the module extensions and loaders
 - plugins: Define the webpack plugins
 - resolve: Webpack will search the modules in this directory
--*/
const config = {

    mode: 'production',

    entry: {
        main: './app/main.js',
    },

    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js'
    },

    devtool: false,

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
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)(\?[a-z0-9=.]+)?$/,
                use: 'file-loader?name=../images/[name].[ext]'
            }, {
                test: /.*\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
                use: 'file-loader?name=../fonts/[name].[ext]'
            }]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    output: { comments: false },
                    compress: { warnings: false, drop_console: true }
                }
            }),
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new ExtractTextPlugin('./assets/styles/[name].css'),
        new assembleWebpack.AttachedPlugin({
            baseLayout: ['./app/layouts/**/*.hbs'],
            basePages: ['./app/pages/**/*.hbs'],
            partialsLayout: ['./app/components/**/*.hbs'],
            partialsData: [
              './app/components/**/*.json',
              './app/pages/**/*.json'
            ],
            helpers: [handlebarsHelpers(), './app/helpers/helpers.js']
        }),
        new WebpackShellPlugin({
            onBuildExit: ['node postbuild.js']
        }),
        new CopyWebpackPlugin([{
            context: './app/assets/images',
            from: '**/*',
            to: './assets/images/'
        }, {
            context: './app/assets/scripts/vendor',
            from: '*',
            to: './assets/scripts/vendor/'
        },
        {
            context: './app/assets/data',
            from: '*',
            to: './assets/data/'
        },
        {
            context: './app/assets/fonts/*',
            from: '*',
            to: './assets/fonts/'
        }])

    ],

    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    }
};

module.exports = config;

