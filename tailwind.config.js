/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      /*
        Format
          <MY_COLOR_NAME>: <COLOR_HEX_CODE> // <OFFICIAL_COLOR_NAME>
      */
      "blue-more-green": "#31C3BD", // maximum-blue-green
      "green-more-blue": "#65E9E4", // near moon
      "dark-yellow": "#F2B137", // solar power
      "light-yellow": "#FFC860", // grilled cheese
      "almost-black": "#1A2A33", // abyssal-anchorfish-blue
      "almost-black-green": "#1F3641", // into the night
      "dark-gray": "#A8BFC9", // winter sky
      "light-gray": "#DBE8ED", // sidewalk chalk blue,
      "white": "#FFFFFF" // white
    },

    // So that I only use the typography class utilities defined in the root CSS file
    fontFamily: { },
    fontWeight: { },
    fontSize: { },
    letterSpacing: { },

    extend: {
      padding: {
        "24px": "24px"
      },
      gap: {
        "8px": "8px"
      }
    }
  },
  plugins: [],
}

