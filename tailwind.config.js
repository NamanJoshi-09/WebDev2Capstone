/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eef9f4',
          100: '#d6f2e4',
          200: '#b0e5cc',
          300: '#7dd1ae',
          400: '#48b58a',
          500: '#28976f',
          600: '#1b7a59',
          700: '#176248',
          800: '#154e3a',
          900: '#124031',
          950: '#09231c',
        },
        dark: {
          900: '#080c10',
          850: '#0d1117',
          800: '#111827',
          750: '#141d2b',
          700: '#1a2332',
          600: '#1e2d40',
          500: '#243447',
          400: '#2e4057',
        },
        accent: {
          green:  '#28976f',
          teal:   '#0d9488',
          blue:   '#3b82f6',
          purple: '#8b5cf6',
          orange: '#f59e0b',
          red:    '#ef4444',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #0d1117 0%, #111827 50%, #0d1117 100%)',
      },
      boxShadow: {
        'card':       '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
        'glow':       '0 0 20px rgba(40, 151, 111, 0.25)',
        'glow-lg':    '0 0 40px rgba(40, 151, 111, 0.35)',
      },
      animation: {
        'fade-in':      'fadeIn 0.4s ease-out',
        'slide-up':     'slideUp 0.4s ease-out',
        'slide-in-left':'slideInLeft 0.3s ease-out',
        'pulse-slow':   'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:      { from: { opacity: 0 },               to: { opacity: 1 } },
        slideUp:     { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideInLeft: { from: { opacity: 0, transform: 'translateX(-16px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}