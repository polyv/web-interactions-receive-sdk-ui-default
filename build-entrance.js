const glob = require('glob');
const path = require('path');
const fs = require('fs');

const entryPc = {};
const entryMobile = {};
glob.sync(
  path.join('./src/entry', '**', '*.vue'),
).forEach((fullPath) => {
  if (fullPath.indexOf('Mobile') > -1) {
    // 获取path 文件名
    entryMobile[path.basename(fullPath, '.vue')] = fullPath;
  } else if (fullPath.indexOf('Pc') > -1) {
    entryPc[path.basename(fullPath, '.vue')] = fullPath;
  } else {
    entryMobile[path.basename(fullPath, '.vue')] = fullPath;
    entryPc[path.basename(fullPath, '.vue')] = fullPath;
  }
});
let entryMobileStr = '';
let entryPcStr = '';
for (const key in entryMobile) {
  const appPath = '../../' + entryMobile[key];
  entryMobileStr += '\n' + `export { default as ${key} } from '${appPath}';`;
}
entryMobileStr += '\n';
for (const key in entryPc) {
  const appPath = '../../' + entryPc[key];
  entryPcStr += '\n' + `export { default as ${key} } from '${appPath}';`;
}
entryPcStr += '\n';
// 在src/entrance目录下写入文件
fs.writeFileSync('./src/entrance/entranceMobile.js', entryMobileStr);
fs.writeFileSync('./src/entrance/entrancePc.js', entryPcStr);
