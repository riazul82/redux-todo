/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {spectral: 'Spectral'}
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}