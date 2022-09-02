/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.{html,php,js,jsx}"
  ],
  theme:
    require( './resources/js/theme.js' )
  ,
  plugins: [],
}
