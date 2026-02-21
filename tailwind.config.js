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
      },
      fontSize: {
        "m3-headline-large": 32,
        "m3-headline-medium": 28,
        "m3-headline-small": 24,

        "m3-body-large": 16,
        "m3-body-medium": 14,
        "m3-body-small": 12,

        "m3-label-large": 14,
        "m3-label-medium": 12,
        "m3-label-small": 11,
      },
      lineHeight: {
        "m3-headline-large": 40,
        "m3-headline-medium": 36,
        "m3-headline-small": 32,

        "m3-body-large": 24,
        "m3-body-medium": 20,
        "m3-body-small": 16,

        "m3-label-large": 20,
        "m3-label-medium": 16,
        "m3-label-small": 16,
      },
      letterSpacing: {
        "m3-label-large": 0.1,
        "m3-label-medium": 0.5,
        "m3-label-small": 0.5,

        "m3-body-large": 0.5,
        "m3-body-medium": 0.25,
        "m3-body-small": 0.4,
      },
      fontWeight: {
        normal: "400",
        bold: "600",
      }
    },
  },
  plugins: [],
}

