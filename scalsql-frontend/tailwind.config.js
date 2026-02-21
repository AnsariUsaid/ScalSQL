/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#121212',
        surfaceHighlight: '#1e1e1e',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        textMain: '#ffffff',
        textMuted: '#9ca3af',
        border: '#27272a'
      }
    },
  },
  plugins: [],
}
