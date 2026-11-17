import { defineVitestConfig } from "@nuxt/test-utils/config";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineVitestConfig({
  // Nuxt 4 sets Vite's root to `app/`. Keep Vitest rooted at the repo so `tests/` is collected.
  root: rootDir,
  resolve: {
    alias: {
      "#app/nuxt-vitest-app-entry": fileURLToPath(
        new URL("./node_modules/@nuxt/test-utils/dist/runtime/entry.mjs", import.meta.url),
      ),
    },
  },
  test: {
    root: rootDir,
    environment: "nuxt",
    setupFiles: [fileURLToPath(new URL("./tests/setup.ts", import.meta.url))],
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL("./playground", import.meta.url)),
      },
    },
  },
});
