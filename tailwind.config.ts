import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        surface: '#F5F3EF',
        'surface-2': '#EAE7E2',
        accent: '#C9963F',
        'accent-light': '#D4A84B',
        'text-1': '#1A1714',
        'text-2': '#6B6560',
        'text-3': '#B5AFA9',
        border: '#DDD8D2',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '4px',
      },
    },
  },
  plugins: [],
}

export default config
