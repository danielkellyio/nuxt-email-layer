// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: "../layer",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  runtimeConfig: {
    // uncomment and provide .env vars to play with mailgun provider
    // email: {
    //   provider: "mailgun",
    //   mailgun: {
    //     apiKey: "",
    //     domain: "",
    //   },
    // },
  },
});
