const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const defaultConfig = require('./webpack.config.base.js');

module.exports = merge(defaultConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserJSPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        asyncVendors: {
          // bundle split
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `async.${packageName.replace('@', '')}`;
          },
          priority: 1,
          chunks: 'async',
        },
        vendors: {
          // code split
          name: 'vendors',
          test: function (module) {
            // 阻止.css文件资源打包到vendor chunk中
            if (module.resource && /\.css$/.test(module.resource)) {
              return false;
            }
            // node_modules目录下的模块打包到vendor chunk中
            return module.context && module.context.includes('node_modules');
          },
          priority: 2,
          chunks: 'initial', // 只打包初始时依赖的第三方
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
  ],
});
