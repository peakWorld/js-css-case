const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ROOT_PATH, SRC_PATH, OUTPUT_PATH, isPro } = require('./constants');
const { getStyleLoaders } = require('./utils');

module.exports = {
  entry: path.join(SRC_PATH, './app.tsx'),
  output: {
    path: OUTPUT_PATH,
    filename: isPro ? 'js/[name].[contenthash:10].js' : '[name].[contenthash].js',
    chunkFilename: isPro ? 'js/[name].[contenthash:10].js' : '[name].[contenthash].js',
    publicPath: '/',
    clean: {
      keep: /dll/,
    },
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
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|woff2?|eot|ttf)$/i,
        type: 'asset', // 根据文件大小选择模式
        generator: {
          filename: `images/[name][ext]?[hash:6]`,
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 小于8kb, 使用内联模式
          },
        },
      },
      ...getStyleLoaders(),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(ROOT_PATH, './tsconfig.json'),
      }),
    ],
  },
  optimization: {
    moduleIds: 'named', // mode: production该值为 deterministic
    runtimeChunk: true, // 打出runtime chunk
  },
  plugins: [
    new HtmlWebpackPlugin({
      env: process.env.NODE_ENV,
      template: './index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: !isPro, // 是否异步
      typescript: {
        // 对ts的语义和语法进行检查
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
      eslint: {
        // 进行eslint检查
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    // 只引入中英文语言库
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
    // new BundleAnalyzerPlugin()
  ],
};
