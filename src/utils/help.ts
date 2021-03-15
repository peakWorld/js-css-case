/**
 * 随机正整数
 * @param {number} max 最大值 
 */
export function randInt (max: number = 10) {
  return Math.ceil(Math.random() * max)
}