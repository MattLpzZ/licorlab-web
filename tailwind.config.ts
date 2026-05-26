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
        primary: '#0A0A0B',
        surface: '#111113',
        'surface-2': '#1A1A1D',
        accent: '#C9963F',
        'accent-light': '#E4B96A',
        'text-1': '#F5F0E8',
        'text-2': '#9C9589',
        'text-3': '#4A4540',
        border: '#242220',
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
