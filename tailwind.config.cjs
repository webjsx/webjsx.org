// tailwind.config.cjs
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        customYellow: "#fbd507",
        customBlue: "#9edadc",
        darkred: "#8B0000", // Defined as hex for consistency
      },
      boxShadow: {
        custom: "3px 3px 3px #4e6536",
      },
      maxWidth: {
        "320px": "320px",
      },
      width: {
        "30px": "30px",
        "120px": "120px",
      },
      height: {
        "120px": "120px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      listStyleType: {
        circle: "circle",
      },
    },
  },
  variants: {
    extend: {
      margin: ["last"],
      // Removed colors and boxShadow from variants as they don't belong here
    },
  },
  plugins: [],
};
