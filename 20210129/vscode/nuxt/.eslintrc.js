module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'prettier',
    'prettier/vue',
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    // 빈 태그 셀프 클로징 추가
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any'
          // void: 'never',
          // normal: 'always',
          // component: 'always'
        }
      }
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'import/prefer-default-export': 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-shadow': ['error', { allow: ['state'] }],
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off'
  }
}
