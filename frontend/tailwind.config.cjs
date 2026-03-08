module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: { 
        scout: '#0F4C23',
        'scout-dark': '#0B3A1A',
        'scout-light': '#1e7a3a',
        'scout-accent': '#6ed49a'
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: []
}
