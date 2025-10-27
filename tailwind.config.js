import heroUINativePlugin from 'heroui-native/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Allow manual theme switching (via class) so libraries can set color-scheme programmatically
  darkMode: 'class',
  content: [
    // Your app files
    "./src/**/*.{js,jsx,ts,tsx}",
    // HeroUI Native
    "./node_modules/heroui-native/lib/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [heroUINativePlugin],
}