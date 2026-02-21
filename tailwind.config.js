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
        'm3-headline-large': ['32px', { lineHeight: '40px', fontWeight: '400' }],
        'm3-headline-large-emphasized': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'm3-headline-medium': ['28px', { lineHeight: '36px', fontWeight: '400' }],
        'm3-headline-medium-emphasized': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'm3-headline-small': ['24px', { lineHeight: '32px', fontWeight: '400' }],
        'm3-headline-small-emphasized': ['24px', { lineHeight: '32px', fontWeight: '600' }],

        'm3-label-large': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '400' }],
        'm3-label-large-emphasized': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '600' }],
        'm3-label-medium': ['12px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '400' }],
        'm3-label-medium-emphasized': ['12px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '600' }],
        'm3-label-small': ['11px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '400' }],
        'm3-label-small-emphasized': ['11px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '600' }],

        'm3-body-large': ['16px', { lineHeight: '24px', letterSpacing: '0.5px', fontWeight: '400' }],
        'm3-body-large-emphasized': ['16px', { lineHeight: '24px', letterSpacing: '0.5px', fontWeight: '600' }],
        'm3-body-medium': ['14px', { lineHeight: '20px', letterSpacing: '0.25px', fontWeight: '400' }],
        'm3-body-medium-emphasized': ['14px', { lineHeight: '20px', letterSpacing: '0.25px', fontWeight: '600' }],
        'm3-body-small': ['12px', { lineHeight: '16px', letterSpacing: '0.4px', fontWeight: '400' }],
        'm3-body-small-emphasized': ['12px', { lineHeight: '16px', letterSpacing: '0.4px', fontWeight: '600' }],
      }
    },
  },
  plugins: [],
}

