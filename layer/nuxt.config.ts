// https://nuxt.com/docs/api/configuration/nuxt-config
import vue from "@vitejs/plugin-vue";

export default defineNuxtConfig({
  $meta: {
    name: "email",
  },

  runtimeConfig: {
    email: {
      provider: "mailcatcher",
      defaultFrom: "yoyoyo@sandbox4ed740f8a04d45f69bb83eac56fe48ca.mailgun.org",
      mailcatcher: {
        storageKey: "mailcatcher",
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
    storage: {
      mailcatcher: {
        driver: "fs",
        base: "./.data/mailcatcher",
      },
    },
  },
  modules: ["@nuxt/eslint", "@nuxt/devtools-ui-kit"],
});
