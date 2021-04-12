const lStr = 'abcdefghijklmnopqrstuvwxyz'
const uStr = lStr.toUpperCase()
const ll = '@#$&'

 /**
  * 便函数 设置组合类名
  * @param rootCls 根类名
  */
export function setClassName (rootCls: string) {
  return (suffix: string) => {
    return `${rootCls}-${suffix}`
  }
}

/**
 * 获取随机id
 */
export function getRandomId () {
  let str = ''
  for (let i = 0; i < 9; i++) {
    if (i === 4) {
      str += ll[Math.floor(Math.random() * 4)]
    } else if (i % 2 === 0) {
      str += lStr[Math.floor(Math.random() * 26)]
    } else {
      str += uStr[Math.floor(Math.random() * 26)]
    }
  }
  return str
}