/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: 'tw-',
  theme: {
    extend: {}
  },
  corePlugins: {
    // preflight: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
