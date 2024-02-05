/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      color: {
        primary: '#eeeeee',
        accent: '#ffc639',
        secondary: '#393e46',
        dark: '#2a2a2a',
        aqua: '	#00FFFF',
        blue: '#4682B4',
        red: '#FF0000',
        tomato: '#FF6347',
        purple: '#663399',
        orange: '#FFA500',
        black: '#111',
        medium: '#0000CD',
        lightblue: '#4169E1',
        lavender: '#E6E6FA',
        lime: '#00FF00',
        darkgray: '#A9A9A9',
        gainsboro: '#DCDCDC',
        greenyellow: '#ADFF2F',
        darkblue: '#00008B',
        darkcyan: '#008B8B',
        light: '#FFFFE0',
        lightgreen: '#90EE90',
        gold: '#FFD700',
        deepskyblue: '#00BFFF',
      }
    }
  },
  plugins: [],
}