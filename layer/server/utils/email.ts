import type { Component } from "vue";
import type {
  EmailParamsWithBody,
  EmailRepsonse,
  EmailProviders,
} from "../libs/useEmail/types";
import { createHooks } from "../libs/hookLib";
import { render } from "@vue-email/render";
export { useEmail } from "../libs/useEmail";

// Hooks to Expose from the Library
export const emailLayerHooks = createHooks<{
  "send:before": (
    payload: EmailParamsWithBody,
    context: { provider: EmailProviders },
  ) => EmailParamsWithBody;
  "send:after": (
    payload: EmailRepsonse,
    context: { provider: EmailProviders; email: EmailParamsWithBody },
  ) => EmailRepsonse;
}>();

/**
 * Render a Vue email template to HTML.
 *
 * @param template - The Vue email template to render.
 * @param data - The data to pass to the template.
 * @returns The HTML version of the rendered template.
 */
export async function renderTemplate(
  template: Component,
  data: Record<string, unknown> = {},
): Promise<string> {
  try {
    // Render the Vue email template
    const html = await render(
      template,
      Object.keys(data).length > 0 ? data : undefined,
    );
    return html;
  } catch (error) {
    console.error(`Error rendering email template:`, error);
    throw new Error(`Failed to render email template`, {
      cause: error,
    });
  }
}

/**
 * Render a Vue email template to plain text.
 *
 * @param template - The Vue email template to render.
 * @param data - The data to pass to the template.
 * @returns The plain text version of the rendered template.
 */
export async function renderTemplateToPlainText(
  template: Component,
  data: Record<string, unknown> = {},
): Promise<string> {
  try {
    // Render the Vue email template
    const text = await render(
      template,
      Object.keys(data).length > 0 ? data : undefined,
      {
        plainText: true,
      },
    );
    return text;
  } catch (error) {
    console.error(`Error rendering email template:`, error);
    throw new Error(`Failed to render email template`, {
      cause: error,
    });
  }
}

/**
 * Retry an async function with exponential backoff.
 *
 * @param fn - The async function to execute; should throw to trigger a retry.
 * @param options - Retry options
 *   attempts: total number of attempts, including the first try (default: 3)
 *   initialDelay: initial delay in ms (default: 500)
 *   maxDelay: max delay in ms (default: 5000)
 *   factor: backoff multiplier (default: 2)
 *   onRetry: optional callback on retry error
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options?: {
    attempts?: number;
    initialDelay?: number;
    maxDelay?: number;
    factor?: number;
    onRetry?: (err: unknown, attempt: number) => void | Promise<void>;
  },
): Promise<T> {
  const {
    attempts = 3,
    initialDelay = 500,
    maxDelay = 5000,
    factor = 2,
    onRetry,
  } = options || {};
  let attempt = 0;
  let delay = initialDelay;

  while (attempt < attempts) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= attempts) {
        throw err;
      }
      if (onRetry) {
        await onRetry(err, attempt);
      }
      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(delay, maxDelay)),
      );
      delay *= factor;
    }
  }
  // To satisfy TypeScript; should not reach here.
  throw new Error("retryWithBackoff: unknown error");
}
