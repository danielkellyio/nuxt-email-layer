// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: "../layer",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/test-utils"],
});
