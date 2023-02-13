//
// /* eslint-disable quote-props */
// const devWarnProdError = process.env.NODE_ENV === 'production' ? 'error' : 'warn';
//
// module.exports = {
//   root: true,
//   env: {
//     node: true,
//     es6: true,
//     browser: true
//   },
//   parserOptions: {
//     parser: 'babel-eslint'
//   },
//   plugins: ['sonarjs'],
//   'extends': [
//     'eslint:recommended',
//     'plugin:sonarjs/recommended',
//     '@vue/standard',
//     'plugin:vue/recommended'
//   ],
//   rules: {
//     // 调试
//     'no-console': [
//       devWarnProdError,
//       { 'allow': ['info', 'warn', 'error', 'time', 'timeEnd'] }
//     ],
//     'no-debugger': devWarnProdError,
//
//     // 基本
//     'semi': ['error', 'always'],
//     'indent': ['error', 2, {
//       'SwitchCase': 1
//     }],
//     'brace-style': ['error', '1tbs', {
//       'allowSingleLine': true
//     }],
//     'quotes': ['error', 'single'],
//     'quote-props': ['error', 'as-needed', {
//       'numbers': true
//     }],
//
//     // 变量
//     'new-cap': 'error',
//     'camelcase': 'error',
//     'no-use-before-define': ['error', {
//       'functions': false,
//       'classes': false,
//       'variables': true
//     }],
//     'no-unused-vars': [devWarnProdError, {
//       vars: 'all',
//       args: 'after-used'
//     }],
//
//     // 空白与换行
//     'semi-spacing': 'error',
//     'array-bracket-spacing': ['error', 'never'],
//     'block-spacing': ['error', 'always'],
//     'computed-property-spacing': 'error',
//     'comma-spacing': 'error',
//     'func-call-spacing': 'error',
//     'key-spacing': 'error',
//     'keyword-spacing': 'error',
//     'no-trailing-spaces': 'error',
//     'no-whitespace-before-property': 'error',
//     'space-before-blocks': 'error',
//     'space-before-function-paren': ['error', {
//       anonymous: 'never',
//       named: 'never',
//       asyncArrow: 'always'
//     }],
//     'space-in-parens': 'error',
//     'space-infix-ops': 'error',
//     'space-unary-ops': 'error',
//     'spaced-comment': ['error', 'always', {
//       'block': {
//         'markers': ['!'],
//         'balanced': true
//       }
//     }],
//     'object-curly-spacing': ['error', 'always'],
//     'object-property-newline': ['error', {
//       allowAllPropertiesOnSameLine: true
//     }],
//     'operator-linebreak': ['error', 'after'],
//     'eol-last': ['error', 'always'],
//     'padded-blocks': 0,
//
//     // 逗号
//     'comma-dangle': ['error', 'only-multiline'],
//     'comma-style': 'error',
//
//     // 其他
//     'no-extra-bind': 'error',
//     'no-extra-label': 'error',
//     'no-floating-decimal': 'error',
//     'no-implied-eval': 'error',
//     'no-iterator': 'error',
//     'no-loop-func': 'error',
//     'no-multi-spaces': 'error',
//     'no-proto': 'error',
//     'no-script-url': 'error',
//     'no-throw-literal': 'error',
//     'no-useless-call': 'error',
//     'no-new': 0,
//     'no-with': 'error',
//     'no-constant-condition': devWarnProdError,
//     'no-empty': [devWarnProdError, {
//       'allowEmptyCatch': true
//     }],
//     'no-lonely-if': 0,
//     'curly': ['error', 'multi-line'],
//     'wrap-iife': ['error', 'inside'],
//
//     // ES6
//     'no-var': 'error',
//     'prefer-const': 'error',
//     'no-duplicate-imports': 'error',
//     'prefer-promise-reject-errors': 'error',
//     'template-curly-spacing': ['error', 'never'],
//     'no-template-curly-in-string': 0,
//     'arrow-spacing': 'error',
//     'no-confusing-arrow': 'error',
//     'import/order': 0,
//     'unicorn/prefer-includes': 0,
//     'promise/prefer-await-to-then': 'error',
//
//     // Sonarjs
//     'sonarjs/no-duplicate-string': ['error', 5],
//
//     // Vue.js
//     'vue/html-indent': ['error', 2],
//     'vue/html-self-closing': ['error', {
//       html: {
//         'void': 'always',
//         normal: 'never',
//         component: 'always'
//       }
//     }],
//     'vue/no-v-html': 0,
//     'vue/max-attributes-per-line': ['error', {
//       singleline: 3,
//       multiline: 1
//     }],
//     'vue/singleline-html-element-content-newline': 0,
//   },
//   globals: {
//     'APP_VERSION': false,
//     'APP_BUILD_TIME': false,
//   },
// };
module.exports = {
  root: true,
  extends: [
    './node_modules/@polyv/eslint-config/lib/for-vue'
  ],
  globals: {
    APP_VERSION: false,
    APP_BUILD_TIME: false,
  },
};
