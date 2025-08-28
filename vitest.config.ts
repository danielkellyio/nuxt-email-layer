import { defineVitestConfig } from "@nuxt/test-utils/config";
import { fileURLToPath } from "node:url";

export default defineVitestConfig({
  test: {
    setupFiles: ["../tests/setup.ts"],
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL("./playground", import.meta.url)),
      },
    },
  },
});
