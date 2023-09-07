import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#333333',
        'primary-white': '#FFFFFF',
        'primary-blue': '#547C8B',

        'primary-blue-50': '#0D0D547C8B',
        'primary-blue-100': '#1A547C8B',
        'primary-blue-200': '#33547C8B',
        'primary-blue-300': '#4D547C8B',
        'primary-blue-400': '#66547C8B',
        'primary-blue-500': '#7F547C8B',
        'primary-blue-600': '#99547C8B',
        'primary-blue-700': '#B27C8B',
        'primary-blue-800': '#CC7C8B',
        'primary-blue-900': '#E67C8B',

        'primary-green': '#589A74',
        'primary-green-50': '#0D0D589A74',
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
