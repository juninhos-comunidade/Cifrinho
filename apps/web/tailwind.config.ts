import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        card: '#111827',
        primary: '#10B981',
        secondary: '#3B82F6',
        accent: '#8B5CF6',
        foreground: '#F9FAFB',
        muted: '#9CA3AF',
        border: '#1F2937',
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        lg: '16px',
        xl: '24px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
