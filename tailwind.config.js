module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ['Arvo', 'serif'],
      body: ['"Titillium Web"', 'sans-serif'],
    },
    screens: {
      xs: '560px',
      sm: '640px',
      md: '800px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
