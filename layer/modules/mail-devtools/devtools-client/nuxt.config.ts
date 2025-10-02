export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxt/devtools-ui-kit"],
  vite: {
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.MAIN_SERVER_PORT || "3000"}`,
          changeOrigin: true,
        },
      },
    },
  },
});
