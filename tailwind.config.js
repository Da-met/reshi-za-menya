// tailwind.config.js
/** @type {import('tailwindcss').Config} */

// Создаем конфиг в переменной, а потом экспортируем
const config = {
  darkMode: ['class', '[class~="night"]', '[class~="sky"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'ui-serif', 'Georgia', 'serif'],
      },
      animation: {
        'progress': 'progress 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-up': 'slideUpFromButton 0.4s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-in-from-bottom-5': 'slide-in-from-bottom-5 0.4s ease-out',
      },
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideUpFromButton: {
          from: { 
            opacity: '0',
            transform: 'translateY(30px) scale(0.6)'
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}

// Экспортируем переменную, а не анонимный объект
export default config;