import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'floatingSvg': 'floatingSvg 5s ease-in-out infinite',
        'blur': 'blurEffect 3s ease-in-out infinite',
      },
      keyframes: {
        floatingSvg: {
          '0%': { transform: 'translateY(-50px)' },
          '50%': { transform: 'translateY(50px)' },
          '100%': { transform: 'translateY(-50px)' },
        },
        blurEffect: {
          '0%': { filter: 'blur(0)' },
          '50%': { filter: 'blur(5px)' },
          '100%': { filter: 'blur(0)' },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-black": "#181C14",
        "custom-white": "#E5E9F0",
        "custom-bg-light": "#f8ede3",
        // "custom-fg-light": "#8d493a",
        "custom-fg-light": "#732717",
        "custom-sdbar-light": "#db654b",
        "custom-bg-dark": "",
        "custom-fg-dark": "",
        "custom-golden": "#e9d296",
      },
    },
  },
  plugins: [],
};
export default config;
