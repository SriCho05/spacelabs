/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        techblue: '#00f0ff',
        deepviolet: '#7f00ff',
        neongreen: '#baffc9',
        light: '#f5f5f5',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        spacegrotesk: ['Space Grotesk', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '0.7' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '0.7' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
    },
  },
  plugins: [],
  safelist: [
    'scale-x-0',
    'scale-x-100',
    'group-hover:scale-x-100',
    'opacity-0',
    'opacity-100',
    'group-hover:opacity-100',
    'transition-transform',
    'transition-opacity',
    'origin-left',
  ],
};
