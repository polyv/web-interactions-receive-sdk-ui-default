/**
 * @file 包信息
 */

const path = require('path');
const pkgJSON = require('../package');

// 构建环境
exports.env = process.env.BUILD_ENV;

// UMD 模块占用的全局变量名
exports.libGlobal = 'PolyvIRScene';

// OSS 上的路径
exports.ossPath = '/interactions-receive-sdk-ui-default/';

// 发布后的正式版本
exports.version = pkgJSON.version;

// 目标目录
exports.currentLibDest = path.resolve(__dirname, '../dist/');

// 需要编译的依赖
exports.transpileDependencies = [
  '@polyv/utils',
  '@just4',
  'lodash-es',
  'js-base64'
];

// 本地开发服务器代理
exports.devServerProxy = (function() {
  return {
  };
})();

// 开发服务器端口号
exports.devServerPort = 24001;

// 开发服务器局域网ip
exports.devServerHost = 'localhost';
