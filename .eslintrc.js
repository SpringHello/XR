// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow == operator
    'eqeqeq': 0,

    'space-before-function-paren': 0,
    'space-before-blocks': 0,
    // 关闭不可扩展js内置对象
    'no-extend-native': 0,
    'indent': 0,
    'spaced-comment': 0,
    'comma-dangle': 0,
    'curly': 0,
    'quotes': 0,
    'no-mixed-operators': 0,
    'no-multiple-empty-lines': 0,
    'space-unary-ops': 0,
    'camelcase': 0
  }
}
