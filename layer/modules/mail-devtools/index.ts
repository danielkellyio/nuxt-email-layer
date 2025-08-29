import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
import { setupDevToolsUI } from "./devtools";

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "email-devtools",
    configKey: "emailDevtools",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    devtools: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Add route rule for the email devtools
    // Prevent the devtools from being rendered on the server
    nuxt.options.routeRules = nuxt.options.routeRules || {};
    nuxt.options.routeRules["/__email-devtools"] = {
      ssr: false,
    };

    if (options.devtools) setupDevToolsUI(nuxt, resolver);
  },
});
