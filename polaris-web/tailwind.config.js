/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,ts,tsx,jsx,css,scss}'
    ],
    theme: {
        extend: {}
    },
    plugins: [
        require("daisyui")
    ]
}
