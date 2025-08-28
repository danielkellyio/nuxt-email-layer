import { defineVitestConfig } from "@nuxt/test-utils/config";
import { fileURLToPath } from "node:url";

export default defineVitestConfig({
  test: {
    setupFiles: [fileURLToPath(new URL("./tests/setup.ts", import.meta.url))],
    root: fileURLToPath(new URL("./", import.meta.url)),
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL("./playground", import.meta.url)),
      },
    },
  },
});
