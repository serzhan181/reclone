/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: false
  },
  plugins: [
    function({ addComponents }) {
      addComponents({

        '.container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': { maxWidth: '640px' },
          '@screen md': { maxWidth: '768px' },
          '@screen lg': { maxWidth: '1080px' },
        }

      })
    }
  ],
}
