const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ROOT_PATH, SRC_PATH, OUTPUT_PATH, isPro } = require('./constants');
const { getStyleLoaders, getFileLoader } = require('./utils');

module.exports = {
  entry: path.join(SRC_PATH, './app.tsx'),
  output: {
    path: OUTPUT_PATH,
    filename: isPro ? 'js/[name].[contenthash:10].js' : '[name].js',
    chunkFilename: isPro ? 'js/[name].[contenthash:10].js' : '[name].js',
    publicPath: '/'
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: SRC_PATH,
        exclude: /(node_modules)/,
        use: [
          'thread-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // 关闭ts-loader的类型检查,配合fork-ts-checker-webpack-plugin使用
              happyPackMode: true, // 使用thread-loader时,必须为true
            }
          }
        ]
      },
      getFileLoader(),
      ...getStyleLoaders(),
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(ROOT_PATH, './tsconfig.json')
      })
    ]
  },
  optimization: {
    runtimeChunk: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      env: process.env.NODE_ENV,
      template: './index.html'
    }),
    new ForkTsCheckerWebpackPlugin({
      async: !isPro, // 是否异步
      typescript: { // 对ts的语义和语法进行检查
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        }
      },
      eslint: { // 进行eslint检查
        files: './src/**/*.{ts,tsx,js,jsx}'
      }
    }),
    // new BundleAnalyzerPlugin()
  ]
}