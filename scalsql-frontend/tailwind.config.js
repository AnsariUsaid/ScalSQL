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
        "primary": "#a855f7", 
        "primaryHover": "#7e22ce", // Map old primaryHover
        "primary-dark": "#7e22ce", 
        "background-base": "#050507",
        "background-dark": "#0a0a0c", 
        "surface-dark": "#111116", 
        "neon-glow": "#d8b4fe", 
        "neon-purple": "#b026ff",
        "neon-blue": "#4c1d95",
        textMain: '#ffffff',
        textMuted: '#9ca3af',
        border: '#27272a'
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'draw-line': 'draw 2s ease-out forwards',
        'scan': 'scan 2s linear infinite',
        'glow-pulse': 'glowPulse 2s infinite alternate',
        'shimmer': 'shimmer 2.5s infinite linear',
        'card-float': 'cardFloat 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
            '0%': { transform: 'translateY(40px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        },
        draw: {
            '0%': { width: '0%' },
            '100%': { width: '100%' }
        },
        glowPulse: {
            '0%': { boxShadow: '0 0 5px #a855f7, 0 0 10px #a855f7' },
            '100%': { boxShadow: '0 0 20px #a855f7, 0 0 40px #4c1d95' }
        },
        shimmer: {
            '0%': { backgroundPosition: '-1000px 0' },
            '100%': { backgroundPosition: '1000px 0' }
        },
        cardFloat: {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '25%': { transform: 'translateY(-8px) rotate(0.8deg)' },
            '75%': { transform: 'translateY(4px) rotate(-0.5deg)' },
        },
      }
    },
  },
  plugins: [],
}
