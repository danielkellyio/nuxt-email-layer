export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxt/devtools-ui-kit"],
  vite: {
    server: {
      proxy: {
        // Proxy the api requests to the main server
        // WHY? Because we can add the API endpoints to the main app
        // and easily use the useEmail composable within it without installing in the devtools dev server
        // plus this let's the consuming app's nuxt.config.ts configure the email provider, storage base, etc
        "/api": {
          target: `http://localhost:${process.env.MAIN_SERVER_PORT || "3000"}`,
          changeOrigin: true,
        },
      },
    },
  },
});
