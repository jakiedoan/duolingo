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
        // border: 'hsl(var(--border))',
        // input: 'hsl(var(--input))',
        // ring: 'hsl(var(--ring))',
        // background: 'hsl(var(--background))',
        // foreground: 'hsl(var(--foreground))',
        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        // secondary: {
        //   DEFAULT: 'hsl(var(--secondary))',
        //   foreground: 'hsl(var(--secondary-foreground))',
        // },
        // destructive: {
        //   DEFAULT: 'hsl(var(--destructive))',
        //   foreground: 'hsl(var(--destructive-foreground))',
        // },
        // muted: {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'hsl(var(--muted-foreground))',
        // },
        // accent: {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))',
        // },
        // popover: {
        //   DEFAULT: 'hsl(var(--popover))',
        //   foreground: 'hsl(var(--popover-foreground))',
        // },
        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))',
        // },

        snow: {
          DEFAULT: 'rgb(var(--color-snow) / <alpha-value>)',
          light: 'rgb(var(--color-snow-always-light) / <alpha-value>)',
        },
        polar: {
          DEFAULT: 'rgb(var(--color-polar) / <alpha-value>)',
          light: 'rgb(var(--color-polar-always-light) / <alpha-value>)',
        },
        owl: {
          DEFAULT: 'rgb(var(--color-owl) / <alpha-value>)',
          light: 'rgb(var(--color-owl-always-light) / <alpha-value>)',
        },
        'tree-frog': {
          DEFAULT: 'rgb(var(--color-tree-frog) / <alpha-value>)',
          light: 'rgb(var(--color-tree-frog-always-light) / <alpha-value>)',
        },
        macaw: {
          DEFAULT: 'rgb(var(--color-macaw) / <alpha-value>)',
          light: 'rgb(var(--color-macaw-always-light) / <alpha-value>)',
        },
        swan: {
          DEFAULT: 'rgb(var(--color-swan) / <alpha-value>)',
          light: 'rgb(var(--color-swan-always-light) / <alpha-value>)',
        },
        eel: {
          DEFAULT: 'rgb(var(--color-eel) / <alpha-value>)',
          light: 'rgb(var(--color-eel-always-light) / <alpha-value>)',
        },
        'bea-secondary': 'rgb(var(--color-bea-secondary) / <alpha-value>)',
        hare: {
          DEFAULT: 'rgb(var(--color-hare) / <alpha-value>)',
          light: 'rgb(var(--color-hare-always-light) / <alpha-value>)',
        },
        wolf: {
          DEFAULT: 'rgb(var(--color-wolf) / <alpha-value>)',
          light: 'rgb(var(--color-wolf-always-light) / <alpha-value>)',
        },
        cardinal: {
          DEFAULT: 'rgb(var(--color-cardinal) / <alpha-value>)',
          light: 'rgb(var(--color-cardinal-always-light) / <alpha-value>)',
        },
        fox: {
          DEFAULT: 'rgb(var(--color-fox) / <alpha-value>)',
          light: 'rgb(var(--color-fox-always-light) / <alpha-value>)',
        },
        'guinea-pig': {
          DEFAULT: 'rgb(var(--color-guinea-pig) / <alpha-value>)',
          light: 'rgb(var(--color-guinea-pig-always-light) / <alpha-value>)',
        },
        'fire-ant': {
          DEFAULT: 'rgb(var(--color-fire-ant) / <alpha-value>)',
          light: 'rgb(var(--color-fire-ant-always-light) / <alpha-value>)',
        },

        beetle: 'rgb(var(--color-beetle) / <alpha-value>)',
        peacock: 'rgb(var(--color-peacock) / <alpha-value>)',
        starfish: 'rgb(var(--color-starfish) / <alpha-value>)',
        dragon: 'rgb(var(--color-dragon) / <alpha-value>)',
        grizzly: {
          DEFAULT: 'rgb(var(--color-grizzly) / <alpha-value>)',
          lite: 'rgb(var(--color-grizzly-lite) / <alpha-value>)',
        },
        'gilded-secondary':
          'rgb(var(--color-gilded-secondary) / <alpha-value>)',
        'gold-shine': 'rgb(var(--color-gold-shine) / <alpha-value>)',
        bee: 'rgb(var(--color-bee) / <alpha-value>)',
        facebook: 'rgb(var(--color-facebook) / <alpha-value>)',
        google: 'rgb(var(--color-google) / <alpha-value>)',
      },
      boxShadow: {
        lesson:
          '0 8px 0 rgb(0, 0, 0, 0.2), 0 8px 0 rgb(var(--path-character-color));',
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
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  safelist: [
    {
      pattern: /(bg|text|outline|border|\[)-.*/,
    },
  ],
} satisfies Config;

export default config;
