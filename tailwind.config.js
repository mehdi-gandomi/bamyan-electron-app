const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      display: ['Oswald'],
      body: ['"Open Sans"'],
    },
    extend: {
      boxShadow: {
        all_sides: '0 0 4px 1px #ccc',
      },
      fontFamily: {
        // sans: ['Secular One', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: (theme) => ({
        img1: "url('https://res.cloudinary.com/ingootag-com/image/upload/v1650019234/samples/food/ilovepdf_pages-to-jpg/3123123434_ijssbo.jpg')",
        img2: "url('https://res.cloudinary.com/ingootag-com/image/upload/v1650366747/samples/food/pexels-lukas-349610_y0to1k.jpg')",
      }),
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        purple: '#3f3cbb',
        midnight: '#121063',
        metal: '#565584',
        tahiti: '#3ab7bf',
        silver: '#ecebff',
        'bubble-gum': '#ff77e9',
        bermuda: '#78dcca',
        orange: '#ff6347',
        green: '#4d7c0f',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
