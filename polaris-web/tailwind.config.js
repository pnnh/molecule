/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,ts,tsx,jsx,css,scss}',
        './node_modules/tw-elements/js/**/*.js'
    ],
    theme: {
        extend: {}
    },
    plugins: [
        require("tw-elements/plugin.cjs"),
        require("daisyui")
    ]
}
