import { colors as themeColors } from "./src/theme/colors";
import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      themeColors,
      colors,
    },
    colors: themeColors,
    fontFamily: {
      normal: ["Poppins_400Regular"],
      medium: ["Poppins_500Medium"],
      semibold: ["Poppins_600SemiBold"],
      "poppins-bold": ["Poppins_700Bold"],
    },
  },
  plugins: [],
};
