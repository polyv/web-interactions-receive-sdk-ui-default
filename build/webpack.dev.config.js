const path = require('path');
const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.config');
const { devServerPort, devServerProxy, devServerHost } = require('./build-config');

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');
const copySrc = path.resolve(__dirname, '../public');
const publicPath = '/';

module.exports = merge(baseConfig, {
  entry: path.join(srcPath, 'main.js'),

  devtool: 'source-map',

  output: {
    path: distPath,
    publicPath
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(copySrc, 'index.html'),
      templateParameters: {
        BASE_URL: publicPath
      }
    }),

    new CopyPlugin({
      patterns: [
        {
          from: copySrc,
          to: distPath,
          filter: async (resourcePath) => {
            if (path.relative(copySrc, resourcePath) === 'index.html') {
              return false;
            }
            return true;
          }
        }
      ]
    })
  ],

  devServer: {
    host: devServerHost,
    port: devServerPort,
    disableHostCheck: true,
    https: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: devServerProxy
  }
});
