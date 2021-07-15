module.exports = {
  'src/**/*.(ts|tsx)': (allFiles) => {
    const check = ['tsc -p tsconfig.json']; // 对ts类型进行校验
    if (allFiles.length > 10) {
      check.push('npm run --silent lint:fix --max-warnings 0');
    } else {
      check.push(`eslint ${allFiles.join(' ')} --fix --max-warnings 0`);
    }
    return check;
  },
};
