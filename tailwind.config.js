/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Mapped from your CSS variables
        'custom-pink': '#e5a1aa',
        'custom-blue': '#4a90e2',
        'custom-green': '#7ed321',
        'dark-text': '#f1eee4',
        'dark-bg': '#28309c',
        'light-text': '#222222',
        'light-bg': '#fcfcfa',
      },
      screens: {
        // Custom breakpoint to match GSAP's matchMedia
        'lg': '969px',
      },
    },
  },
  plugins: [],
}
