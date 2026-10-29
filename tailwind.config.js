// File: tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0B0F17',
          800: '#111827',
          700: '#1F2937',
          600: '#374151'
        },
        electric: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7'
        }
      }
    },
  },
  plugins: [],
}