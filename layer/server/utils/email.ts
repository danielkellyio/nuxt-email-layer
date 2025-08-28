import type { Component } from "vue";
import type {
  EmailParams,
  EmailRepsonse,
  EmailProviders,
} from "../libs/useEmail/types";
import { createHooks } from "../libs/hookLib";
import { render } from "@vue-email/render";
export { useEmail } from "../libs/useEmail";

// Hooks to Expose from the Library
export const emailLayerHooks = createHooks<{
  "send:before": (
    payload: EmailParams,
    context: { provider: EmailProviders }
  ) => EmailParams;
  "send:after": (
    payload: EmailRepsonse,
    context: { provider: EmailProviders; email: EmailParams }
  ) => EmailRepsonse;
}>();

// Template rendering function
export async function renderTemplate(
  template: Component,
  data: Record<string, unknown> = {}
): Promise<string> {
  try {
    // Render the Vue email template
    const html = await render(
      template,
      Object.keys(data).length > 0 ? data : undefined
    );
    return html;
  } catch (error) {
    console.error(`Error rendering email template:`, error);
    throw new Error(`Failed to render email template`, {
      cause: error,
    });
  }
}
