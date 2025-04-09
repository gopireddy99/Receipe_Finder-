/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'inherit',
            a: {
              color: 'inherit',
              '&:hover': {
                color: '#f97316', // orange-500
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    import('@tailwindcss/typography'), // Changed from require() to import()
  ],
};