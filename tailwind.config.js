module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#322625',
        grey: '#ebebeb',
        blue: '#c0e3e5',
        yellow: '#fdc936',
      },
      fontFamily: {
        'neutra-text': ['Neutra Text', 'sans-serif'],
      },
    },
  },
  plugins: [],
}