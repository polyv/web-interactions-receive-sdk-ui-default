/**
 * api 请求封装
 * @packageDocumentation
 */

import { send } from '@just4/ajax/ajax';
import { startsWithProtocol } from '@polyv/utils/src/net';

/**
 * API 请求封装
 * @class
 */
export default class APIQuery {
  /** 请求域名前缀 */
  _baseURL = '';

  /** 超时数值 */
  _timeout = null;

  constructor(options) {
    if (options.baseURL) { this.setBaseURL(options.baseURL); }
    this._timeout = options.timeout || 10000;
  }

  /**
   * 修改请求前缀
   * @param baseURL 新的请求前缀
   * @returns this
   */
  setBaseURL(baseURL) {
    this._baseURL = baseURL;
    return this;
  }

  _addBaseURL(url) {
    if (!this._baseURL || startsWithProtocol(url)) {
      return url;
    } else {
      return this._baseURL.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
    }
  }

  async _request(url, options) {
    options.timeout = options.timeout || this._timeout;
    const res = await send(this._addBaseURL(url), options);
    return res.data;
  }

  // @resolved 这里是否也加个 params 的参数呢，保持跟 post 一样三个参数？
  get(url, params, options) {
    return this._request(
      url,
      Object.assign(
        {
          params,
        },
        options,
        {
          method: 'get'
        }
      )
    );
  }

  post(url, data, options) {
    return this._request(
      url,
      Object.assign({
        url,
        data
      }, options, {
        method: 'post'
      }));
  }
}
