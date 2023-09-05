/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,js}", 
      "./node_modules/flowbite/**/*.js",
      "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'marble-blue': '#205375',
      'rescue-orange': '#F36C21',
      'purity': '#F0EFEF',
      'gray': '#D9D9D9',
      'navy-blue': '#102B3C',
      'rescue-orange-dark': '#CC5527',
      'bermuda': '#78dcca',
    },
    fontFamily: {
          'header': ['Barlow-black', 'san-serif']
    },
    extend: {}
  },
  
  plugins: [
    require('flowbite/plugin')
]
}

