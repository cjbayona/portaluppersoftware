/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./site/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        // Paleta corporativa: azul en tonos suaves
        brand: {
          50: '#f0f7fd',
          100: '#e0eefa',
          200: '#bddcf4',
          300: '#8ec3eb',
          400: '#58a5de',
          500: '#3589cb',
          600: '#246dad',
          700: '#1f588c',
          800: '#1e4b74',
          900: '#1d3f61',
          950: '#132840',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
