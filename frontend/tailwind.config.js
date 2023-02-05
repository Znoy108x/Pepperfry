const withMT = require("@material-tailwind/react/utils/withMT");
const { default: plugin } = require("tailwindcss");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}" , './node_modules/tw-elements/dist/js/**/*.js','node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    ripple: theme => ({
      colors: theme('colors'),
      modifierTransition: 'background 0.01s',
      activeTransition: 'background 0.01s',
      darken: 0.1
    }),
    extend: {
      keyframes: {
        'fade-in-down': {
            '0%': {
                opacity: '0',
                transform: 'translateY(-10px)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
        }
    },
      animation : {
        "fade-in-down" : "fade-in-down 0.5s ease-out"
      },
      backgroundImage: {
        'blue_purple_grad': "linear-gradient(90deg,#4ca5ff 2.34%,#b673f8 100.78%)",
        "bg2" : "radial-gradient(at right bottom, rgb(192, 38, 211), rgb(253, 186, 116), rgb(147, 51, 234))",
        "bg3" : "radial-gradient(at center center, rgb(192, 132, 252), rgb(126, 34, 206), rgb(107, 33, 168))"
      },
      colors:{
        baby_orange : "#e8effd",
        baby_sky : "#306cdd",
        baby_purple : "#b634ec",
        baby_cyan : "#21d2b3",
        baby_active:"#5226ff",
        baby_links:"#27262e",
        baby_green:"#b6c8c9" ,
        baby_white : "#f8fafa",
        baby_light_green : "#eef2f2" ,
        baby_orange : "#f2eae1",
        baby_orange2:"#e85b45",
        baby_gray:"#3b342f",
        baby_cyan:"#6ebcb6",
        baby_cyan_lite : "#e9f5f3",
        baby_light_lime : "#deecdf",
        baby_light_yellow : "#feeed7",
        baby_light_blue : "#e1eefa",
        baby_text2: "#2b394f",
        pepperfry : "#ec2326"
      },
      fontFamily : {
        "Baby_Barlow": ['Barlow', 'sans-serif'],
        "Baby_Inter": ['Inter', 'sans-serif'],
        "Baby_Nunito": ['Nunito', 'sans-serif'],
        "Baby_PlayFair": ['Playfair Display', 'serif'],
        "Baby_PtSherif": ['PT Serif', 'serif'],
        "Baby_Roboto": ['Roboto', 'sans-serif'],
        "Baby_Urbanist": ['Urbanist', 'sans-serif'],
        "dancing": ['Dancing Script', 'cursive'],
        "pop": ['Poppins', 'sans-serif'],
        "open_sans": ['Open Sans', 'sans-serif'],
        "archivo": ['Archivo Black', "sans-serif"],
        "courgette": ['Courgette', "cursive"],
        "greate": ['Great Vibes', "cursive"],
        "lobster": ['Lobster', "cursive"],
        "pacifico": ['Pacifico', "cursive"],
        "playtome": ['Paytone One', "sans-serif"],
        "russo": ['Russo One', "sans-serif"],
        "roman": ['Gideon Roman', "cursive"],
        "kanit": ['Kanit', "sans-serif"],
        "bree": ['Bree Serif', 'serif']
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    require('tw-elements/dist/plugin'),
    require('flowbite/plugin')
  ],
  variants: {
    scrollbar: ['rounded']
  }
})