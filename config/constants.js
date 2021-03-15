/*
 * @Author: lyf
 * @Date: 2021-02-01 10:33:49
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-15 19:19:36
 * @Description: 路径常量
 * @FilePath: /cook-electron/Users/a58/iworkspace/js-css-case/config/constants.js
 */
const path = require('path')

const ROOT_PATH = process.cwd()
const OUTPUT_PATH = path.join(ROOT_PATH, './output')
const SRC_PATH = path.join(ROOT_PATH, './src')

const isDev = process.env.NODE_ENV === 'development'
const isPro = process.env.NODE_ENV === 'production'

module.exports = {
  ROOT_PATH,
  OUTPUT_PATH,
  SRC_PATH,
  isDev,
  isPro,
}