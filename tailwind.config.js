import dark from "./src/styles/darkColors";
import light from "./src/styles/lightColors";
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    colors: {
      primary: "#6552FE",
      dark: {
        text: "#fff",
        background: "#070707",
      },
      light: {
        text: "#202020",
        background: "#F3F3F3",
      },
    },
    fontFamily: {
      normal: ["Poppins_400Regular"],
      medium: ["Poppins_500Medium"],
      semibold: ["Poppins_600SemiBold"],
      bold: ["Poppins_700Bold"],
    },
  },
  plugins: [],
};
