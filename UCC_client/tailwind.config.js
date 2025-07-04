/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        teal: '#008080',
        indigo: '#4B0082',
        purple: '#6A0DAD',
        green: '#00FF00',
        lightGreen: '#00CC66',
        white: '#ffffff',
        gray800: '#333333',
      },
      animation: {
        'menu-expand': 'menu-expand 0.5s ease forwards',
        'menu-collapse': 'menu-collapse 0.5s ease forwards',
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        'menu-expand': {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '100vh', opacity: '1' },
        },
        'menu-collapse': {
          '0%': { maxHeight: '100vh', opacity: '1' },
          '100%': { maxHeight: '0', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
