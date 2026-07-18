/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        surface: {
          DEFAULT: '#FAF9F6', // off-white/warm cream main background
          alt: '#F7F5F0',     // slightly darker cream
          card: '#FFFFFF',    // pure white for cards
          border: '#E2E0D9',  // soft neutral border tone
        },
        // Typography
        text: {
          primary: '#2D3748',   // Charcoal/slate for high contrast but softer than black
          secondary: '#4A5568', // Medium slate
          muted: '#A0AEC0',     // Light slate
        },
        // Brand: Leafy Green (~#3AA33A)
        brandGreen: {
          50: '#F0F9F0',
          100: '#DDF1DD',
          200: '#BCE2BC',
          300: '#91CF91',
          400: '#64B864',
          500: '#3AA33A', // Base
          600: '#2A832A',
          700: '#236723',
          800: '#1F521F',
          900: '#1B431B',
        },
        // Brand: Warm Orange (~#F2803D)
        brandOrange: {
          50: '#FEF6F1',
          100: '#FDECE2',
          200: '#FAD5C0',
          300: '#F7B797',
          400: '#F49669',
          500: '#F2803D', // Base
          600: '#E4611A',
          700: '#BE4B11',
          800: '#963C11',
          900: '#793311',
        },
        // Semantic states
        status: {
          success: '#3AA33A', // Aligning success with brand green
          info: '#3182CE',    // Blue for info
          warning: '#D69E2E', // Distinct yellow/gold, not orange
          danger: '#E53E3E',  // Distinct red, cooler than orange
        },
      },
      backgroundImage: {
        'flame-gradient': 'linear-gradient(to right, #F2803D, #E53E3E)', // Orange to Red-Orange
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2.25rem', { lineHeight: '1.25' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'caption': ['0.875rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '2xs': '0.25rem', // 4px
        'xs': '0.5rem',   // 8px
        'sm': '0.75rem',  // 12px
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
      },
      borderRadius: {
        'sm': '0.25rem',  // 4px
        'md': '0.5rem',   // 8px
        'lg': '1rem',     // 16px
        'xl': '1.5rem',   // 24px
        'full': '9999px',
      },
      boxShadow: {
        // Soft, warm-toned shadows to feel premium on a light background
        'soft': '0 4px 20px rgba(45, 55, 72, 0.04)',
        'medium': '0 8px 30px rgba(45, 55, 72, 0.08)',
        'strong': '0 12px 40px rgba(45, 55, 72, 0.12)',
      },
    },
  },
  plugins: [],
}
