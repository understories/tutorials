/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './[step]/**/*.{js,ts,jsx,tsx,mdx}',
    './hello-world/**/*.{js,ts,jsx,tsx,mdx}',
    './page.tsx',
    './layout.tsx',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

