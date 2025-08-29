import type { Nuxt } from "nuxt/schema";
import type { Resolver } from "@nuxt/kit";

const DEVTOOLS_UI_ROUTE = "/__email-devtools";

export function setupDevToolsUI(nuxt: Nuxt, resolver: Resolver) {
  nuxt.hook("devtools:customTabs", (tabs) => {
    tabs.push({
      // unique identifier
      name: "email-devtools",
      // title to display in the tab
      title: "Email",
      // any icon from Iconify, or a URL to an image
      icon: "mdi:email",
      // iframe view
      view: {
        type: "iframe",
        src: DEVTOOLS_UI_ROUTE,
      },
    });
  });
}
