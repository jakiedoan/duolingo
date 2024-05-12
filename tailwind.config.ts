import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        mobile: '320px',
        tablet: '700px',
        'tablet-mid': [{ max: '699px' }, { min: '700px', max: '1065px' }],
        desktop: '1160px',
      },
      fontSize: {
        base: '15px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        snow: {
          default: 'rgb(var(--color-snow))',
          light: 'rgb(var( --color-snow-always-light))',
        },
        polar: {
          default: 'rgb(var(--color-polar))',
          light: 'rgb(var( --color-polar-always-light))',
        },
        owl: {
          default: 'rgb(var(--color-owl))',
          light: 'rgb(var( --color-owl-always-light))',
        },
        'tree-frog': {
          default: 'rgb(var(--color-tree-frog))',
          light: 'rgb(var(--color-tree-frog-always-light))',
        },
        macaw: {
          default: 'rgb(var(--color-macaw))',
          light: 'rgb(var(--color-macaw-always-light))',
        },
        swan: {
          default: 'rgb(var(--color-swan))',
          light: 'rgb(var(--color-swan-always-light))',
        },
        eel: {
          default: 'rgb(var(--color-eel))',
          light: 'rgb(var(--color-eel-always-light))',
        },
        'bea-secondary': 'rgb(var(--color-bea-secondary))',
        hare: {
          default: 'rgb(var(--color-hare))',
          light: 'rgb(var(--color-hare-always-light))',
        },
        wolf: {
          default: 'rgb(var(--color-wolf))',
          light: 'rgb(var(--color-wolf-always-light))',
        },
        cardinal: {
          default: 'rgb(var(--color-cardinal))',
          light: 'rgb(var(--color-cardinal-always-light))',
        },
        fox: {
          default: 'rgb(var(--color-fox))',
          light: 'rgb(var(--color-fox-always-light))',
        },
        'guinea-pig': {
          default: 'rgb(var(--color-guinea-pig))',
          light: 'rgb(var(--color-guinea-pig-always-light))',
        },
        'fire-ant': {
          default: 'rgb(var(--color-fire-ant))',
          light: 'rgb(var(--color-fire-ant-always-light))',
        },
        'gilded-secondary': 'rgb(var(--color-gilded-secondary))',
        'gold-shine': 'rgb(var(--color-gold-shine))',
        bee: 'rgb(var(--color-bee))',
        facebook: 'rgb(var(--color-facebook))',
        google: 'rgb(var(--color-google))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        loading:
          'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite, bounce 1.5s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
