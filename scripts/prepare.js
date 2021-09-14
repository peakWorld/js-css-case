/*
 * @Author: lyf
 * @Date: 2021-07-29 16:01:54
 * @LastEditors: lyf
 * @LastEditTime: 2021-09-14 17:00:37
 * @Description: npm prepare钩子执行操作
 * @FilePath: /taro-cloud-demo/Users/a58/iworkspace/js-css-case/scripts/prepare.js
 */
const path = require('path');
const fs = require('fs');
const util = require('util');
const { exec } = require('child_process');

const ROOT_PATH = process.cwd();
const LOG_PATH = path.join(ROOT_PATH, './scripts/debug.log');

const log = (data) => {
  let willWrite = '';
  if (typeof data === 'object') {
    willWrite = util.inspect(data, { depth: Infinity });
  }
  fs.writeFileSync(LOG_PATH, `${willWrite}\n`, { flag: 'a' });
};

// husky相关配置
const isHushkyInstalled = fs.existsSync(path.join(ROOT_PATH, '.husky'));
log({ isHushkyInstalled });
if (!isHushkyInstalled) {
  // 初始化husky配置
  require('husky').install();
}

const isPreCommitExist = fs.existsSync(path.join(ROOT_PATH, '.husky/pre-commit'));
if (!isPreCommitExist) {
  // 安装必备的git hooks阶段
  exec('npx husky add .husky/pre-commit "npx lint-staged"');
}

// 将start.sh文件变为可执行文件
exec('chmod 777 ./start.sh');
