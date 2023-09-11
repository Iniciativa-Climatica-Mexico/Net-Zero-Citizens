import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          50: '#f6f8f9',
          100: '#eef2f3',
          200: '#dde5e8',
          300: '#ccd8dc',
          400: '#bbcbd1',
          500: '#aabec5',
          600: '#98b0b9',
          700: '#87a3ae',
          800: '#7696a2',
          900: '#658997',
          DEFAULT: '#547C8B',
        },
        secondary: {
          50: '#f7faf8',
          100: '#eef5f1',
          200: '#deebe3',
          300: '#cde1d5',
          400: '#bcd7c7',
          500: '#accdba',
          600: '#9bc2ac',
          700: '#8ab89e',
          800: '#79ae90',
          900: '#69a482',
          DEFAULT: '#589A74',
        },
        txt: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#d6d6d6',
          300: '#c2c2c2',
          400: '#adadad',
          500: '#999999',
          600: '#858585',
          700: '#707070',
          800: '#5c5c5c',
          900: '#474747',
          DEFAULT: '#333333',
        },
        background: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
export default config
