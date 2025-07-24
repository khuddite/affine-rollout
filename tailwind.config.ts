import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        haffer: ["Haffer", "sans-serif"],
        hafferSQ: ["HafferSQ", "sans-serif"],
        ttCommonsPro: ["TTCommonsPro", "sans-serif"],
        firacode: ["FiraCode", "sans-serif"],
        dmMono: ["DM Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
