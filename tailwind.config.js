/** @type {import('tailwindcss').Config} */

// The emerald / cyan / violet palettes are driven by CSS variables so the
// whole site can switch colour themes at runtime (see src/themes.css).
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: { 300: v('p300'), 400: v('p400'), 500: v('p500'), 600: v('p600') },
        cyan:    { 300: v('s300'), 400: v('s400'), 500: v('s500') },
        violet:  { 400: v('t400'), 500: v('t500'), 600: v('t600') },
      },
    },
  },
  plugins: [],
}
