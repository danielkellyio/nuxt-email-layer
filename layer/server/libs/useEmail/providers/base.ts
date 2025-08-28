import type {
  EmailParams,
  EmailRepsonse,
  EmailProvider,
  EmailProviders,
} from "../types";
import { emailLayerHooks } from "../../../utils/email";

export abstract class BaseProvider implements EmailProvider {
  constructor() {
    const config = useRuntimeConfig();
    this.defaultFrom = config.email.defaultFrom || undefined;
  }
  defaultFrom?: string;
  abstract name: EmailProviders;
  async send(email: EmailParams): Promise<EmailRepsonse> {
    const emailAfterHook: EmailParams = await emailLayerHooks.callHook(
      "send:before",
      email,
      { provider: this.name },
    );

    const response = await this.commitSend(emailAfterHook);

    const responseAfterHook = await emailLayerHooks.callHook(
      "send:after",
      response,
      { provider: this.name, email: emailAfterHook },
    );

    return responseAfterHook;
  }
  abstract commitSend(email: EmailParams): Promise<EmailRepsonse>;
}
