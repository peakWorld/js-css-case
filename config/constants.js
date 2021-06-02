/*
 * @Author: lyf
 * @Date: 2021-02-01 10:33:49
 * @LastEditors: lyf
 * @LastEditTime: 2021-05-21 23:28:15
 * @Description: 路径常量
 * @FilePath: /js-css-case/config/constants.js
 */
const path = require('path');

const ROOT_PATH = process.cwd();
const OUTPUT_PATH = path.join(ROOT_PATH, './output');
const SRC_PATH = path.join(ROOT_PATH, './src');
const DLL_PATH = path.join(OUTPUT_PATH, './dll');

const isDev = process.env.NODE_ENV === 'development';
const isPro = process.env.NODE_ENV === 'production';

module.exports = {
  ROOT_PATH,
  OUTPUT_PATH,
  SRC_PATH,
  DLL_PATH,
  isDev,
  isPro,
  isAntd: true,
};
