import type {
  EmailParams,
  EmailRepsonse,
  EmailProviders,
} from "../libs/useEmail/types";
import { createHooks } from "../libs/hookLib";
export { useEmail } from "../libs/useEmail";

// Hooks to Expose from the Library
export const emailLayerHooks = createHooks<{
  "send:before": (
    payload: EmailParams,
    context: { provider: EmailProviders },
  ) => EmailParams;
  "send:after": (
    payload: EmailRepsonse,
    context: { provider: EmailProviders; email: EmailParams },
  ) => EmailRepsonse;
}>();
