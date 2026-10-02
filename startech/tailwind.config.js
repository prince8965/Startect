/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070B",
        "surface-dark": "#080D18",
        panel: "#0D1422",
        "panel-border": "rgba(85, 230, 255, 0.12)",
        "panel-hover": "#111B30",
        cyan: {
          DEFAULT: "#55E6FF",
          glow: "rgba(85, 230, 255, 0.35)",
          dim: "#2288A2",
        },
        orbital: {
          DEFAULT: "#4776FF",
          glow: "rgba(71, 118, 255, 0.35)",
        },
        success: {
          DEFAULT: "#35E6A2",
          dim: "#175E42",
        },
        warning: {
          DEFAULT: "#FFC857",
        },
        error: {
          DEFAULT: "#FF5C6C",
        },
        foreground: "#EAF4FF",
        muted: "#7D8EA5",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "'IBM Plex Mono'",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        "cyan-glow": "0 0 20px rgba(85, 230, 255, 0.25)",
        "blue-glow": "0 0 25px rgba(71, 118, 255, 0.25)",
        "panel-glow": "0 4px 20px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, rgba(85, 230, 255, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
