import { defineVitestConfig } from "@nuxt/test-utils/config";
import { fileURLToPath } from "node:url";

export default defineVitestConfig({
  resolve: {
    alias: {
      "#app/nuxt-vitest-app-entry": fileURLToPath(
        new URL("./node_modules/@nuxt/test-utils/dist/runtime/entry.mjs", import.meta.url),
      ),
    },
  },
  test: {
    environment: "nuxt",
    setupFiles: [fileURLToPath(new URL("./tests/setup.ts", import.meta.url))],
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL("./playground", import.meta.url)),
      },
    },
  },
});
