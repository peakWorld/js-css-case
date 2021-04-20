const webpack = require('webpack')
const path = require('path')
const { DLL_PATH, ROOT_PATH } = require('./constants')

module.exports = {
  context: ROOT_PATH,
  mode: 'development',
  entry: {
    vendors: ['react', 'react-dom', 'react-router-dom', 'antd', '@ant-design/icons'],
  },
  output: {
    path: DLL_PATH,
    filename: '[name].dll.js',
    library: {
      type: 'umd',
      name: '[name]_library'
    },
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(DLL_PATH, './[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}