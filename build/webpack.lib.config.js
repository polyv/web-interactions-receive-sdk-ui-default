const path = require('path');
const glob = require('glob');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const rimraf = require('rimraf');
const baseConfig = require('./webpack.config');
const buildConfig = require('./build-config');
const { buildPkgJSON } = require('./build-package-info');
let publicPath;
publicPath = '/'


// 删除上次构建的文件
console.info('Clearing old files...');
rimraf.sync(path.join(path.resolve(__dirname, '../dist'), '**', '*'));
console.info('Done.');

// 找到所有要构建的入口文件
const entry = {};
const entrancePc = path.resolve(__dirname, '../src/entrance/entrancePc.js');
const entranceMobile = path.resolve(__dirname, '../src/entrance/entranceMobile.js');
const entryDirname = path.resolve(__dirname, '../src/entry');
glob.sync(
  path.join(entryDirname, '**', '*.vue')
).forEach((fullPath) => {
  entry[path.basename(fullPath, '.vue')] = fullPath;
});
const entryApp = Object.assign({
  entrancePc,
  entranceMobile,
}, entry);
const libBaseConfig = merge(baseConfig, {
  devtool: 'source-map',
  entry: entryApp,
  output: {
    publicPath
  }
});

// 分别构建 commonjs 和 umd 格式的文件
module.exports = [
  merge(libBaseConfig, {
    mode: 'production',
    output: {
      path: buildConfig.currentLibDest,
      filename: 'lib/[name]/index.js',
      libraryTarget: 'commonjs2'
    },
    externals: {
      vue: 'vue'
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../package.json'),
            to: path.join(buildConfig.currentLibDest, 'package.json'),
            transform(content) {
              return buildPkgJSON(content);
            }
          },
        ]
      }),
    ]
  }),

  merge(libBaseConfig, {
    mode: 'production',
    output: {
      path: buildConfig.currentLibDest,
      filename: 'lib/[name]/[name].umd.min.js',
      libraryTarget: 'umd',
      library: [buildConfig.libGlobal, '[name]']
    },
    externals: {
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue'
      }
    }
  })
];
