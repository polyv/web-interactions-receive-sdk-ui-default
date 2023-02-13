/**
 * @file 语言切换
 */

import StringTmpl from 'string-template';

export class I18n {
  static defaultLang = 'zh_CN';

  _locale = 'zh_CN';

  langs = {};

  constructor(langs = {}) {
    this.langs = langs;
  }

  set locale(newLocale) {
    this._locale = newLocale;
  }

  get locale() {
    return typeof this._locale === 'function' ? this._locale() : this._locale;
  }

  updateLocale(newLocale) {
    this._locale = newLocale;
  }

  /**
   * 根据path 路径获取多语言文案, 没有获取到对应文案默认返回path
   * @params path 语言路径
   * @params options {Object} StringTmpl options参数 用于替换模板变量
   * */
  trans(path = '', options) {
    // 翻译后文本
    let value = '';
    // 目标语言数据
    const lang = this.langs[this.locale] || this.langs[I18n.defaultLang];
    // 当前路径数据
    let current = lang;

    const arr = path.split('.');
    const arrLen = arr.length;
    for (let i = 0; i < arr.length; i++) {
      const property = arr[i];
      value = current[property];
      if (!value && typeof value !== 'string') return path;
      if (i === arrLen - 1) return StringTmpl(value, options);
      current = value;
    }
  }
}
