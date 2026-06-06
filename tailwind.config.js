/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FAFAFA',
          dark: '#0F0F0F',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#7C52E0',
          light: '#F5F0FF',
          border: '#B89AF2',
          dark: '#5530B8',
          'dark-surface': '#2A1F4A',
        },
        text: {
          primary: {
            DEFAULT: '#111111',
            dark: '#EDEDED',
          },
          secondary: '#6B7280',
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#2A2A2A',
        },
        code: {
          bg: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        base: ['16px', { lineHeight: '1.65' }],
      },
      borderRadius: {
        card: '12px',
        tag: '8px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
