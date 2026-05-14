import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#012265',
          blue: '#0D3A95',
          bright: '#034AC5',
          sky: '#E8F1FB'
        },
        promo: '#C74060',
        accent: {
          orange: '#E7721B',
          red: '#FF4242',
          gold: '#C9A14A'
        },
        ink: {
          DEFAULT: '#4A4A4A',
          dark: '#292929',
          mid: '#555555',
          soft: '#777777'
        },
        cream: '#FAFAFA'
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        container: '1200px'
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: []
};
export default config;
