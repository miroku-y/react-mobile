const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//sass
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development'
module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]-[hash].js'
    },
    devServer: {
        port: 1111,
        host: '0.0.0.0',
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new ExtractTextPlugin('styles.css'),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,//支持正则
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                })
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
}