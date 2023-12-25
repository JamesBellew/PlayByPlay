/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add custom keyframes for width animation
      keyframes: {
        widthAnimation: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
      },
      // Extend the animation utility
      animation: {
        'width': 'widthAnimation 2s ease-in-out forwards',
        'width-two': 'widthAnimation 2s ease-in-out 2s forwards',
        'width-three': 'widthAnimation 2s ease-in-out 4s forwards',
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
}
