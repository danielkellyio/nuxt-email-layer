// @ts-nocheck
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["shadcn-docs-nuxt"],

  // Static site generation
  nitro: {
    preset: "static",
  },

  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        language: "en-US",
      },
    ],
  },
  compatibilityDate: "2024-07-06",
});
