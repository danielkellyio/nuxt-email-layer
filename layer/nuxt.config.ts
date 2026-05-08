// https://nuxt.com/docs/api/configuration/nuxt-config
import vue from "@vitejs/plugin-vue";

export default defineNuxtConfig({
  $meta: {
    name: "email",
  },

  runtimeConfig: {
    email: {
      provider: "mailcatcher",
      defaultFrom: "hello@world.com",
      mailcatcher: {
        databasePath: "./.data/mailcatcher.db",
      },
      mailgun: {
        apiKey: "",
        domain: "",
      },
    },
  },

  nitro: {
    rollupConfig: {
      plugins: [vue()],
    },
  },
});
