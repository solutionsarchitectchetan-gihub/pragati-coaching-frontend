/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:  { DEFAULT:'#6C3EF4', dark:'#5429d4', light:'#8B5CF6' },
        accent:   { DEFAULT:'#F59E0B', dark:'#D97706' },
        success:  '#10B981',
        danger:   '#EF4444',
        dark:     '#1E1B4B',
      },
      fontFamily: { sans: ['Inter','sans-serif'] },
      animation: {
        'fade-in':   'fadeIn .4s ease-in-out',
        'slide-up':  'slideUp .5s ease-out',
        'float':     'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { '0%': {opacity:'0'}, '100%': {opacity:'1'} },
        slideUp: { '0%': {transform:'translateY(20px)',opacity:'0'}, '100%': {transform:'translateY(0)',opacity:'1'} },
        float:   { '0%,100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-10px)'} },
      }
    }
  },
  plugins: []
}
