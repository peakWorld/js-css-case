const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const defaultConfig = require('./webpack.config.base.js')
const { OUTPUT_PATH, DLL_PATH, ROOT_PATH, SRC_PATH } = require('./constants')

module.exports = merge(defaultConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    host: 'localhost',
    port: 9886,
    open: 'Google Chrome',
    contentBase: OUTPUT_PATH,
    hot: true,
    compress: true,
  },
  plugins: [
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