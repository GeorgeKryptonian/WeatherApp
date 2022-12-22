const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './scripts/main.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash:10].js',
        assetModuleFilename: 'assets/[name].[contenthash:10][ext]',
        clean: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}