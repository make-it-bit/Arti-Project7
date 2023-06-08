const path = require('path');
const html = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        "index": path.resolve(__dirname, 'src/index.js'),
        "meal-plan": path.resolve(__dirname, 'src/meal-plan.js'),
        "form-handler": path.resolve(__dirname, 'src/other-scripts/form-handler.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                    postcssOptions: {
                        plugins: () => [
                        require('autoprefixer')
                        ]
                    }
                    }
                },
                {
                    loader: 'sass-loader'
                }
                ]
            }, 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Meal Generator - Index',
            filename: 'index.html',
            template: 'src/index.html',
            inject: true,
            chunks: ['index', 'form-handler']
        }),
        new HtmlWebpackPlugin({
            title: 'Meal Generator - Meal plan',
            filename: 'meal-plan.html',
            template: 'src/templates/meal-plan.html',
            inject: true,
            chunks: ['meal-plan', 'form-handler']
        }),
    ]
};