module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true
      }
    },
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {}
  }
}
