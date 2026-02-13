module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bbam: {
          indigo: {
            main: "#585AD1",
            dark: "#473EB4"
          },
          back: {
            page: "#F7F9FA",
            card: "#E5ECF3"
          },
          text: {
            main: "#263238",
            light: "#9DA3A9"
          },
          inactive: "#9DA3A9"
        }
      }
    },
  },
  plugins: [],
}

