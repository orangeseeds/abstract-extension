/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/*.{html,js,svelte,ts}','./src/components/extension/*.{html,js,svelte,ts}', './src/components/extension/assets/*.{html,js,svelte,ts}'  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

