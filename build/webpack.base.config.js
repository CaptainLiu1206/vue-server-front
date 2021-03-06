const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash:8].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public'),
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpg|jpeg|sve|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css?$/i,
                use: isProd 
                    ? ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true }
                            }
                        ],
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.styl(us)?$/,
                use: isProd 
                    ? ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true }
                            },
                            'stylus-loader'
                        ],
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.(scss|sass)?$/i,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true }
                            },
                            'sass-loader'
                        ],
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    performance: {
        maxEntrypointSize: 30000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd
        ? [
            new VueLoaderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new ExtractTextPlugin({
                filename: 'common.[chunkhash].css'
            })
        ]
        : [
            new VueLoaderPlugin(),
            new FriendlyErrorsPlugin()
        ]
}
