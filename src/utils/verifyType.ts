export default class VerifyType {
  /**
   * @summary 判断数据的类型
   */
  private static checkType(data: any) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }

  /**
   * @summary 检验数据类型是否为对象类型
   * @param {any} data
   */
  static isObject(data: any) {
    return ['object'].includes(this.checkType(data));
  }

  /**
   * @summary 检验数据是否为基本类型
   * @param {any} data
   */
  static isBasicType(data: any) {
    return ['null', 'undefined', 'string', 'number', 'boolean', 'symbol'].includes(this.checkType(data));
  }

  /**
   * @summary 检验数据是否为数字
   * @param {any} data
   */
  static isNumber(data: any) {
    return ['number'].includes(this.checkType(data));
  }

  /**
   * @summary 检验数据是否为函数类型
   * @param {any} data
   */
  static isFunc(data: any) {
    return ['function', 'asyncfunction'].includes(this.checkType(data));
  }

  /**
   * @summary 检验数据是否为数组类型
   * @param {any} data
   */
  static isArray(data: any) {
    return ['array'].includes(this.checkType(data));
  }

  /**
   * @summary 检验数据是否为引用类型
   * @param {any} data
   */
  static isReference(data: any) {
    return this.isArray(data) || this.isObject(data) || this.isFunc(data);
  }

  /**
   * @summary 检验数据是否FormData类型, 主要用于类型上传
   * @param {any} data
   */
  static isFormData(data: any) {
    return data instanceof FormData;
  }
}
