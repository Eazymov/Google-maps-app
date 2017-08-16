// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'vue',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'flowtype'
  ],
  // add your custom rules here
  'rules': {
    // added 'flow' support
    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,
    // disable standard semi rule
    'semi': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
