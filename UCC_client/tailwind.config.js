/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        teal: '#008080',
        indigo: '#4B0082',
        purple: '#6A0DAD',
        green: '#684fb1',
        lightGreen: '#5a32cc',
        white: '#ffffff',
        gray800: '#333333',
      },
      animation: {
        'menu-expand': 'menu-expand 0.5s ease forwards',
        'menu-collapse': 'menu-collapse 0.5s ease forwards',
        bounce: 'bounce 1s infinite',
        'fade-in-up': 'fadeInUp 0.3s ease-out both'

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
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
    },
  },
  plugins: [],
};
