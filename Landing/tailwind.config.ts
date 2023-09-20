import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'primary-black': '#333333',
        'primary-white': '#FFFFFF',
        'primary-blue': '#5096AF',

        'primary-blue-50': '#0D5096AF',
        'primary-blue-100': '#1A5096AF',
        'primary-blue-200': '#335096AF',
        'primary-blue-300': '#4D5096AF',
        'primary-blue-400': '#665096AF',
        'primary-blue-500': '#7F5096AF',
        'primary-blue-600': '#995096AF',
        'primary-blue-700': '#B25096AF',
        'primary-blue-800': '#CC5096AF',
        'primary-blue-900': '#E65096AF',

        'primary-green': '#589A74',
        'primary-green-50': '#0D589A74',
        'primary-green-100': '#1A589A74',
        'primary-green-200': '#33589A74',
        'primary-green-300': '#4D589A74',
        'primary-green-400': '#66589A74',
        'primary-green-500': '#7F589A74',
        'primary-green-600': '#99589A74',
        'primary-green-700': '#B2589A74',
        'primary-green-800': '#CC589A74',
        'primary-green-900': '#E6589A74',
      },
    },
  },
  plugins: [],
}
export default config
