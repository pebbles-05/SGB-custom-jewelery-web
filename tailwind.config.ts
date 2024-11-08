import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-black": "#000000",
        "custom-white": "#E5E9F0",
        "custom-bg-light": "#f8ede3",
        // "custom-fg-light": "#8d493a",
        "custom-fg-light": "#732717",
        "custom-sdbar-light":"#db654b",
        "custom-bg-dark": "",
        "custom-fg-dark": "",
        "custom-golden": "#e9d296",
      },
    },
  },
  plugins: [],
};
export default config;
