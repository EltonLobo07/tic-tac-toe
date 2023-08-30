/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      /*
        The view breaks when the width of the viewport is less than 375px
        The minimum viewport width this application will support will be 320px
      */
      mobileAndUp: "23.4375rem", // 375px
      tabAndUp: "34.375rem", // 550px
      laptopAndUp: "68.75rem" // 1100px
    },
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
      "dark-gray-hovered": "#A8BFC90D", // winter sky (alpha value changed to 0.5)
      "light-gray": "#DBE8ED", // sidewalk chalk blue,
      silver: "#A8BFC9", // silver
      white: "#FFFFFF" // white
    },

    // So that I only use the typography class utilities defined in the root CSS file
    fontFamily: { },
    fontWeight: { },
    fontSize: { },
    letterSpacing: { },

    extend: {
      padding: {
        "4px": "4px",
        "6px": "6px",
        "8px": "8px",
        "12px": "12px",
        "16px": "16px",
        "18px": "18px",
        "24px": "24px",
        "28px": "28px"
      },
      gap: {
        "8px": "8px"
      },
      borderRadius: {
        "4px": "4px",
        "8px": "8px",
        "12px": "12px",
        "16px": "16px",
        "inherit": "inherit"
      }
    }
  },
  plugins: [],
}

