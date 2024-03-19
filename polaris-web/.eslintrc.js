module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'next',
    'next/core-web-vitals'
  ],
  globals: {
    React: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    JSX: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  ignorePatterns: [
    'next.config.js',
    'compile/*.js'
  ],
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'no-use-before-define': 'off', // React已经全局定义，但是eslint识别不到所以会报错，这里禁用
    // '@typescript-eslint/no-use-before-define': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'no-trailing-spaces': 'off',
    'object-curly-spacing': 'off',
    'arrow-spacing': 'off',
    'padded-blocks': 'off',
    'space-infix-ops': 'off',
    'no-multiple-empty-lines': 'off',
    'spaced-comment': 'off',
    'comma-dangle': 'off',
    // '@next/next/no-html-link-for-pages': 'off',
    // '@typescript-eslint/no-var-requires': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    indent: 'off',
    semi: 'off',
    'eol-last': 'off',
    'object-property-newline': 'off',
    'space-before-function-paren': 'off',
    'object-shorthand': 'off',
    quotes: 'off',
    'object-curly-newline': 'off'
  }
}
