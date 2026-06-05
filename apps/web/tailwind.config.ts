import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        bg:       'rgb(var(--c-bg) / <alpha-value>)',
        'bg-deep':'rgb(var(--c-bg-deep) / <alpha-value>)',
        card:     'rgb(var(--c-card) / <alpha-value>)',
        elev:     'rgb(var(--c-elev) / <alpha-value>)',
        line:     'rgb(var(--c-line) / <alpha-value>)',
        ink:      'rgb(var(--c-ink) / <alpha-value>)',
        mute:     'rgb(var(--c-mute) / <alpha-value>)',
        faint:    'rgb(var(--c-faint) / <alpha-value>)',
        brand:    'rgb(var(--c-brand) / <alpha-value>)',
        'brand-dk':'rgb(var(--c-brand-dk) / <alpha-value>)',
        blue:     'rgb(var(--c-blue) / <alpha-value>)',
        purple:   'rgb(var(--c-purple) / <alpha-value>)',
        amber:    'rgb(var(--c-amber) / <alpha-value>)',
        rose:     'rgb(var(--c-rose) / <alpha-value>)',
        // legacy aliases (usados nos componentes anteriores)
        background: '#0F172A',
        foreground: '#F9FAFB',
        primary:    '#21C25E',
        secondary:  '#3B82F6',
        accent:     '#8B5CF6',
        muted:      '#9CA3AF',
        border:     '#1F2937',
      },
      borderRadius: {
        sm:      '8px',
        DEFAULT: '12px',
        md:      '12px',
        lg:      '16px',
        xl:      '20px',
        '2xl':   '24px',
      },
    },
  },
  plugins: [],
}

export default config
