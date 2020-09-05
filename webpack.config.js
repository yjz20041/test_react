const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SOURCE_PATH = path.join(__dirname, './src');
const DIST_PATH = path.resolve(__dirname, './dist');
const PCPlugin = require('@music/polyfill-candy-webpack-plugin');


// eslint-disable-next-line no-unused-vars
module.exports = (env = {}, argv) => {
    const mode = argv.mode || 'development';
    const PRODUCTION = mode === 'production';
    const config = {
        entry: {
            index: [path.resolve(__dirname, './test.tsx')]
        },
        output: {
            path: DIST_PATH
        },
        resolve: {
            extensions: ['.jsx', '.tsx', '.ts', '.js', '.css', '.less'],
            alias: {
            }
        },
        module: {},
        mode: 'production',
        devtool: 'source-map',
        externals: {
            // react: 'react',
            // 'prop-types': 'prop-types'
        }
    };
    // 规则
    const rules = [
        {
            test: /\.(js|jsx|tsx|ts)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader'
                },
                // {
                //     loader: 'ts-loader'
                // }
            ]
        },
        {
            test: /\.(css)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                // {
                //     loader: 'style-loader'
                // },
                {
                    loader: 'css-loader'
                }
            ]
        }
    ];
    // 插件
    const plugins = [
        new HtmlPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name][hash:8].css',
            chunkFilename: '[id][hash:8].css'
          })
        // new PCPlugin({
        // })
    ];

    // tree shaking in developmemt mode
    // config.optimization = {
    //     usedExports: true,
    //     sideEffects: true,
    //     nodeEnv: 'development'
    // };

    // optimization
    
    config.optimization = {
        // nodeEnv: 'production',
        // usedExports: true,
        sideEffects: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: {},
                    output: {
                        comments: true,
                        beautify: true
                    },
                    mangle: false,
                    
                }
            })
        ],
        // splitChunks: {
        //     chunks: 'all',
        //     // cacheGroups: {
        //     //     polyfill: {
        //     //         test: /\/node_modules\/(core-js|regenerator-runtime)\//,
        //     //         enforce: true
        //     //     }
        //     // }
        // }
    };

    config.devServer = {
        contentBase: DIST_PATH,
        compress: true,
        port: 9528,
        hot: false,
        hotOnly: true,
        historyApiFallback: true
    };

    // 设置 rules
    config.module.rules = rules;
    // 设置 插件
    config.plugins = plugins;
    return config;
};
