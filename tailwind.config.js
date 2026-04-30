/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#102A83',
          green: '#93C93E',
          cyan: '#00A3E0',
          yellow: '#FFC72C',
          red: '#DA2128',
        }
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        bphmigas: {
          "primary": "#102A83",
          "primary-content": "#ffffff",
          "secondary": "#93C93E",
          "secondary-content": "#ffffff",
          "accent": "#00A3E0",
          "accent-content": "#ffffff",
          "neutral": "#333333",
          "neutral-content": "#ffffff",
          "base-100": "#F8F9FA",
          "base-200": "#E9ECEF",
          "base-300": "#E0E0E0",
          "base-content": "#333333",
          "info": "#00A3E0",
          "info-content": "#ffffff",
          "success": "#93C93E",
          "success-content": "#ffffff",
          "warning": "#FFC72C",
          "warning-content": "#333333",
          "error": "#DA2128",
          "error-content": "#ffffff",
        },
      },
    ],
  },
}
