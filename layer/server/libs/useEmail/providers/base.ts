import type {
  EmailParams,
  EmailParamsWithBody,
  EmailRepsonse,
  EmailProvider,
  EmailProviders,
} from "../types";
import { emailLayerHooks, renderTemplate } from "../../../utils/email";

export abstract class BaseProvider implements EmailProvider {
  constructor() {
    const config = useRuntimeConfig();
    this.defaultFrom = config?.email?.defaultFrom || undefined;
  }
  defaultFrom?: string;
  abstract name: EmailProviders;
  async send(email: EmailParams): Promise<EmailRepsonse> {
    // Render template if provided
    let processedEmail: EmailParams;

    if ("template" in email) {
      // Render the template with data
      const renderedBody = await renderTemplate(
        email.template,
        email.data || {}
      );
      processedEmail = {
        to: email.to,
        subject: email.subject,
        body: renderedBody,
      };
    } else {
      processedEmail = email;
    }

    // set the from address with the default from as a fallback
    processedEmail.from = email.from || this.defaultFrom;

    const emailAfterHook: EmailParamsWithBody = await emailLayerHooks.callHook(
      "send:before",
      processedEmail,
      {
        provider: this.name,
      }
    );

    const response = await this.commitSend(emailAfterHook);

    const responseAfterHook = await emailLayerHooks.callHook(
      "send:after",
      response,
      { provider: this.name, email: emailAfterHook }
    );

    return responseAfterHook;
  }
  abstract commitSend(email: EmailParamsWithBody): Promise<EmailRepsonse>;
}
