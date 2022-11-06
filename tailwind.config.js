/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-text': '#E0E0E0',
        'light-text': '#333333',
        'dark-bg': '#333333',
        inputBorder: '#BDBDBD',
        inputLabel: '#4F4F4F',
        icons: '#828282',
        btnBG: '#2F80ED',
        blueText: '#2D9CDB',
        'light-LogoText': '#282051',
        pinkText: '#EB5757',
      },
    },
  },
  plugins: [],
};
