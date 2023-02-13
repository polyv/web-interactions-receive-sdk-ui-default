/**
 * @file 构建 npm 包的 package.json。
 */

exports.buildPkgJSON = (pkgJSON) => {
  pkgJSON = JSON.parse(pkgJSON);

  // 移除不必要的信息
  delete pkgJSON.private;
  delete pkgJSON.scripts;
  // 打包之后，就不再需要依赖了
  delete pkgJSON.devDependencies;
  delete pkgJSON.dependencies;

  return JSON.stringify(pkgJSON, null, 2) + '\n';
};
