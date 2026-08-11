import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0D0E',
        graphite: '#15171A',
        slate: '#22262A',
        bone: '#F2EFE9',
        mist: '#B9B3A8',
        bronze: { DEFAULT: '#9C7A4E', light: '#C9A574' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1320px' },
      transitionTimingFunction: { arch: 'cubic-bezier(.16,.84,.44,1)' },
    },
  },
  plugins: [],
} satisfies Config;
