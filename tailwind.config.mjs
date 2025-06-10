    /** @type {import('tailwindcss').Config} */
    const config = {
      content: [
        // فقط این دو مسیر باید وجود داشته باشد
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    
    export default config;
    