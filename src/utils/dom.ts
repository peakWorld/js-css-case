export enum PseudoElt {
  BEFORE = ':before',
  AFTER = ':after',
}

/**
 * 获取元素的实时样式
 * @param {HTMLElement} elt dom元素
 * @param {keyof CSSStyleDeclaration} key 指定的样式
 * @param {PseudoElt} pseudoElt 伪元素
 */
export function getCurrentStyle (
  { elt, key, pseudoElt }: { elt: HTMLElement, key: keyof CSSStyleDeclaration, pseudoElt?: PseudoElt }
) {
  let cssKey = ''
  let cssKeys = (key as string).match(/[A-Z]?[a-z]+/g)
  if (cssKeys) {
    cssKeys = cssKeys.map((item) => item.toLowerCase())
    cssKey = cssKeys.join('-')
  }
  return window.getComputedStyle(elt, pseudoElt).getPropertyValue(cssKey);
}