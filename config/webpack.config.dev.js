const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const defaultConfig = require('./webpack.config.base.js')
const { OUTPUT_PATH } = require('./constants')

module.exports = merge(defaultConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|svg|woff2?|eot|ttf)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'img/'
            },
          }
        ],
      },
      {
        test: /\.(otf|woff2?|eot|ttf)$/i,
        exclude: /node_modules/,
        use: 'file-loader'
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 9886,
    hot: true,
    open: 'Google Chrome',
    contentBase: OUTPUT_PATH,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(OUTPUT_PATH, './vendor-manifest.json'))
    }),
  ]
})