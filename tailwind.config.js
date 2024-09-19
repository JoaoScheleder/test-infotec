/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '500': '500ms',
      },
      transform: {
        'translate-y-10': 'translateY(10px)',
      },
      opacity: {
        '0': '0',
        '100': '1',
      },
    },
  },
  plugins: [],
}

