/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  plugins: [require('daisyui')],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: { 
          "primary": "#542169", // #0a7399   (morado)
          "secondary": "#f6d860",
          "warning": "b3e240", // #b3e240 (verde limon)
          "info": "#542169",
          "accent": "#975fb5",
          "neutral": "#3d4451",
          "base-100": "#ffffff"
        }
      }
    ]
  }
}

