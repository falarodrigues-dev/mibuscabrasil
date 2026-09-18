import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "preto-direcao": "#0C0C0C",
        "laranja-impulso": "#FF6400",
        "branco-clareza": "#F9F9F9",
        surface: {
          DEFAULT: "#141414",
          alt: "#1E1E1E",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        control: "8px",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
