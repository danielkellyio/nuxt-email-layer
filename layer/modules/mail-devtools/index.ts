import { defineNuxtModule, createResolver } from "@nuxt/kit";
import { setupDevToolsUI } from "./devtools";

// Module options TypeScript interface definition
// disable eslint rule for empty object type for now in case we need to add options later
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "email-devtools",
    configKey: "emailDevtools",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    if (nuxt.options.devtools.enabled && process.env.NODE_ENV === "development")
      setupDevToolsUI(nuxt, resolver);
  },
});
