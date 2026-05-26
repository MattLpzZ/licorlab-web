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
        surface: '#F9F9F9',
        'surface-2': '#F0EFED',
        accent: '#e71f46',
        'accent-light': '#f04d6b',
        'text-1': '#111111',
        'text-2': '#555555',
        'text-3': '#999999',
        border: '#E8E8E8',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        ui: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '4px',
        md: '8px',
        lg: '10px',
        xl: '14px',
        '2xl': '18px',
      },
    },
  },
  plugins: [],
}

export default config
