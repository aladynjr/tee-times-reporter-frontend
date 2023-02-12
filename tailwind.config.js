
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],

  theme: {
    extend: {
      screens: {
        'xl': '1200px',
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]}
