/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          50:  '#fdf2f2',
          100: '#fce4e4',
          200: '#f9c8c8',
          300: '#f49a9a',
          400: '#ec5f5f',
          500: '#dc3030',
          600: '#c01b1b',
          700: '#8B1A1A',   // primary maroon
          800: '#6B1414',   // deep maroon
          900: '#4A0E0E',   // darkest maroon
          950: '#2D0808',
        },
        silver: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#E8E8E8',   // light silver
          300: '#D4D4D4',
          400: '#C0C0C0',   // classic silver
          500: '#A8A8A8',
          600: '#8A8A8A',
          700: '#6B6B6B',
          800: '#4A4A4A',
          900: '#2A2A2A',
        },
        gold: {
          300: '#F0D060',
          400: '#E0C040',
          500: '#D4AF37',   // classic gold accent
          600: '#B8960C',
        },
        dark: {
          900: '#0A0707',   // near black with warm tint
          800: '#110C0C',
          700: '#1A1010',
          600: '#221515',
        }
      },
      fontFamily: {
        display:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:     ['"Jost"', 'sans-serif'],
        accent:   ['"Cinzel"', 'serif'],
      },
      backgroundImage: {
        'maroon-gradient': 'linear-gradient(135deg, #4A0E0E 0%, #8B1A1A 50%, #6B1414 100%)',
        'dark-gradient':   'linear-gradient(180deg, #0A0707 0%, #1A1010 100%)',
        'silver-gradient': 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)',
      },
      boxShadow: {
        'maroon':    '0 4px 24px rgba(139, 26, 26, 0.35)',
        'maroon-lg': '0 8px 40px rgba(139, 26, 26, 0.5)',
        'gold':      '0 4px 20px rgba(212, 175, 55, 0.3)',
        'luxury':    '0 20px 60px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-in':      'fadeIn 0.6s ease forwards',
        'slide-up':     'slideUp 0.5s ease forwards',
        'slide-in-right': 'slideInRight 0.4s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
