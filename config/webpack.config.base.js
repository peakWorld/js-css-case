const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ROOT_PATH, SRC_PATH, OUTPUT_PATH, isPro } = require('./constants');

module.exports = {
  entry: path.join(SRC_PATH, './app.tsx'),
  output: {
    filename: 'bundle.js',
    path: OUTPUT_PATH,
    publicPath: '/'
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: SRC_PATH,
        loader: 'ts-loader',
        options: {
          transpileOnly: !isPro
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        include: path.join(ROOT_PATH, 'node_modules/antd/dist/antd.css')
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        include: SRC_PATH
      }
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
  plugins: [
    new HtmlWebpackPlugin({
      env: isPro,
      inject: 'body',
      template: './index.html'
    })
    // new  BundleAnalyzerPlugin()
  ]
}