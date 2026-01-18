// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "text-black",
    "text-amber-100",
    "bg-blue-500",
    "bg-fuchsia-400",
    "font-bold",
  ],
};
