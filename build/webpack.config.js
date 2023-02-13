const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { transpileDependencies, version } = require('./build-config');

const srcDirname = path.resolve(__dirname, '../src');
const include = [srcDirname];
if (transpileDependencies) {
  const nodeModules = path.resolve(__dirname, '../node_modules');
  transpileDependencies.forEach((item) => {
    include.push(path.join(nodeModules, item));
  });
}

module.exports = {
  resolve: {
    extensions: ['.js', '.mjs', '.ts', '.vue', '.css', '.scss'],
    alias: {
      '@': srcDirname
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        include,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        include,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: false } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
        ]
      },
      {
        test: /\.scss$/,
        include,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: false } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        include,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|svga|ico|ttf|eot|woff|woff2|otf|mp3)$/,
        include,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              outputPath: 'assets/',
              name: '[name]-[hash:8].[ext]',
              esModule: false,
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      files: ['**/*.{vue,js}'],
      // 忽略demo目录下校验
      exclude: path.resolve(__dirname, '../src/demo')
    }),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{vue,css,scss}']
    }),
    new webpack.DefinePlugin({
      'APP_VERSION': JSON.stringify(version),
      'APP_BUILD_TIME': JSON.stringify(new Date().toString()),
    }),
  ]
};
