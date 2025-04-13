/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,astro,md,mdx}"],
    darkMode: "media",
    theme: {
        extend: {
            typography: {
                css: {
                    h1: {
                        fontSize: "1.5rem",
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
