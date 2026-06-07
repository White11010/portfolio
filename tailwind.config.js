/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
          secondary: {
            DEFAULT: '#6B7280',
            dark: '#9CA3AF',
          },
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
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Fira Code', 'monospace'],
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
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
