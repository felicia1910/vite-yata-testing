module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "2xl": { min: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { min: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { min: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { min: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { min: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { min: "439px" },
      // => @media (max-width: 439px) { ... }
      underLg: { max: "1024px" },
      underSm: { max: "414px" },
      underXs: { max: "388px" },
      range2xl: { min: "1536px", max: "2035px" },
      rangeXl: { min: "1280px", max: "1535px" },
      rangeLg: { min: "1024px", max: "1279px" },
      rangeMd: { min: "768px", max: "1023px" },
      rangeSm: { min: "640px", max: "767px" },
      rangeXs: { min: "480px", max: "639px" },
    },
    extend: {
      // that is animation class
      height: {
        128: "45.5rem",
        120: "39.5rem",
        138: "50rem",
        139: "57rem",
      },
      width: {
        "97": "9.5rem",
        "98": "73.33%",
      },
      aspectRatio: {
        "big-banner": "683 / 197",
      },
      animation: {
        fadeOut: "fadeOut 0.4s ease-out",
        fadeIn: "fadeIn 0.6s ease-in",
        fadeInY: "fadeInY 0.6s ease-in",
        fadeOutY: "fadeOutY 0.6s ease-in",
        modalBgFadeIn: "modalBgFadeIn 0.2s ease-in",
        modalBgFadeOut: "modalBgFadeOut 0.2s ease-out",
      },
      color: require("tailwindcss/colors"),
      colors: {
        "bg-semi-75": "rgba(0, 0, 0, 0.75)",
        "grey-input": "#EEEEEE",
        "grey-i": "#DCDCDC",
        "grey-yellow": "#D2C4B6",
        grey: "#f2f2f2",
        "grey-light": "#F7F5F3",
        "grey-deep": "#666666",
        "yata-extra-light": "#F1F7DE",
        "yata-light": "#D4E683",
        "yata-mid-light": "#F2F6E6",
        yata: "#A6CE39",
        "yata-second": "#A9CD07",
        "yata-medium": "#82A70E",
        "yata-deep": "#82A90E",
        "yata-dotted": "#b08b68",
        "yata-brown": "#6A3B0D",
        "yata-brown-light": "#F7F4EF",
        "cat-yellow-text": "#ECAF00",
        "cat-yellow-bar": "#FFFAC2",
        "cat-yellow": "#FFFEF3",
        "cat-green-text": "#AAD943",
        "cat-green-bar": "#EDFCD8",
        "cat-green": "#FCFEF7",
        "cat-pink-text": "#EB6F8F",
        "cat-pink-bar": "#F9D7E2",
        "cat-pink": "#FEF7F9",
        "cat-blue-bar": "#D8F4FD",
        "cat-blue-text": "#4BBBE9",
        "cat-blue": "#F7FDFE",
        "cat-orange-bar": "#FADAC1",
        "cat-orange-text": "#EC8E55",
        "cat-orange": "#FEF8F3",
        "red-text": "#E94D78",
        "red-remove": "#EA5433",
        "grey-bar": "#C8BEB5",
        "bar-green": "#F6FAE6",
        "light-yellow": "#FBFFE8",
        "light-green": "#F3FAD2",
      },
      // that is actual animation
      keyframes: () => ({
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        modalBgFadeIn: {
          "0%": { opacity: 0, backgroundColor: "black" },
          "100%": { opacity: 0.25, backgroundColor: "black" },
        },
        fadeInY: {
          "0%": { opacity: 0, transform: `translateY(-10%)` },
          "100%": { opacity: 1, transform: `translateY(0%)` },
        },
        modalBgFadeOut: {
          "0%": { opacity: 0.25, backgroundColor: "black" },
          "100%": { opacity: 0, backgroundColor: "black" },
        },
      }),
      transitionProperty: {
        h: "height",
        "max-h": "max-height",
      },
    },
    maxHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      "4/5": "80%",
      full: "100%",
    },
  },
  variants: {},
  plugins: [require("tailwind-scrollbar-hide"),require('@tailwindcss/line-clamp'),],
};
