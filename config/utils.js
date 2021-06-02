const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const { ROOT_PATH, SRC_PATH, isPro, isAntd } = require('./constants');

const getStyleLoaders = () => {
  const styleLoader = isPro ? MiniCssExtractPlugin.loader : 'style-loader';

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [autoprefixer({ flexbox: 'no-2009' }), postcssFlexbugsFixes],
      },
    },
  };

  const loaders = [
    {
      test: /\.scss$/,
      use: [styleLoader, 'css-loader', postcssLoader, 'sass-loader'],
      include: SRC_PATH,
    },
  ];
  if (isAntd) {
    loaders.push({
      test: /\.css$/,
      use: [styleLoader, 'css-loader'],
      include: path.join(ROOT_PATH, 'node_modules/antd/dist/antd.css'),
    });
  }

  return loaders;
};

module.exports = {
  getStyleLoaders,
};
