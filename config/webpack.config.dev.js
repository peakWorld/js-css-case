const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const defaultConfig = require('./webpack.config.base.js')
const { OUTPUT_PATH, DLL_PATH, ROOT_PATH, SRC_PATH } = require('./constants')

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
    open: 'Google Chrome',
    contentBase: [SRC_PATH, OUTPUT_PATH],
    hot: true,
    compress: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: ROOT_PATH,
      manifest: require(path.join(DLL_PATH, './vendors-manifest.json')),
    }),
  ]
})