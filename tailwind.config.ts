/* eslint-disable global-require */
import type { Config } from "tailwindcss"

import plugin from "tailwindcss/plugin"
import flowbite from "flowbite-react/tailwind"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",

    // "./src/**/*.{js,ts,jsx,tsx}", "node_modules/flowbite-react/lib/esm/**/*.js", flowbite.content()
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1348px",
      },
    },
    extend: {
      fontFamily: {
        roboto: "var(--font-roboto)",
        "zen-dots": "var(--font-zen-dots)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: {
          DEFAULT: "#ffffff",
        },
        placeholder: {
          DEFAULT: "#777777",
        },
        ring: "hsl(var(--ring))",
        background: "#1A1E28",
        dark: {
          DEFAULT: "#1F1F1F",
        },

        inactive: "#5F6368",
        active: "#fff",

        foreground: { DEFAULT: "#FFFFFF", secondary: "#F1EDE9" },
        primary: {
          DEFAULT: "#FD7310",
          soft: "#FFE4D1",
          foreground: "#1A1E28",
          hover: "#D15700",
          background: "#5F2700",
          placeholder: "#FD7310",
        },
        secondary: {
          DEFAULT: "#ABABAB",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#303747",
          foreground: "#707070",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "#8BFF78",
          light: "#D8FEC5",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "#222733",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shake: {
          "0%": {
            transform: "translateX(0)",
            backgroundColor: "#7845C6",
            backgroundImage: "unset",
          },
          "10%": {
            transform: "translateX(-25px)",
            backgroundColor: "#7845C6",
            backgroundImage: "unset",
          },
          "20%": {
            transform: "translateX(25px)",
            backgroundColor: "#7845C6",
            backgroundImage: "unset",
          },
          "30%": {
            transform: "translateX(-25px)",
            backgroundColor: "#7845C6",
            backgroundImage: "unset",
          },
          "40%": {
            transform: "translateX(25px)",
            backgroundColor: "#7845C6",
            backgroundImage: "unset",
          },
          "50%": {
            transform: "translateX(-25px)",
            backgroundColor: "#7845C6",
            backgroundImage: "unset",
          },
          "60%": {
            transform: "translateX(25px)",
          },
          "70%": {
            transform: "translateX(-25px)",
          },
          "80%": {
            transform: "translateX(25px)",
          },
          "90%": {
            transform: "translateX(-25px)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "shake-slightly": {
          "0%": {
            transform: "translateX(0)",
          },
          "30%": {
            transform: "translateX(30px)",
          },
          "50%": {
            transform: "translateX(-30px)",
          },
          "75%": {
            transform: "translateX(10px)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
      },
      lineHeight: {
        "4.5": "18px",
        "3.5": "14px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: "shake .7s ease-in-out",
        "shake-slightly": "shake-slightly 1.4s ease-in-out",
      },
    },
  },
  plugins: [
    // flowbite.plugin(),
    require("tailwindcss-animate"),
    plugin(({ addUtilities, addComponents, e }) => {
      addComponents({
        ".text-king-of-the-moon": {
          "-webkit-text-fill-color": "transparent",
          "text-shadow": "-1px -1px rgba(216, 253, 197, 0.5)",
          // "&:hover": {
          //   "-webkit-text-fill-color": "inherit",
          // },
        },
        ".bg-primary-radial-gradient": {
          background: "radial-gradient(50% 50% at 50% 50%, #FD7310 0%, #97450A 100%)",
        },
      })
    }),
  ],
} satisfies Config

export default config
