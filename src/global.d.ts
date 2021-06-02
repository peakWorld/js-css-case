declare module '*.png';

/* 获取属性值 */
type PickValues<T, K extends keyof T> = Pick<T, K>[K];
