import type {
  EmailParams,
  EmailProviderFactory,
  EmailRepsonse,
} from "../types";
import formData from "form-data";
import Mailgun from "mailgun.js";
import { BaseProvider } from "./base";

class MailGunProvider extends BaseProvider {
  name = "mailgun" as const;
  apiKey: string;
  domain: string;

  constructor() {
    super();
    const config = useRuntimeConfig();
    if (!config?.email?.mailgun?.apiKey || !config?.email?.mailgun?.domain) {
      throw new Error("Mailgun API key and domain are required");
    }
    this.apiKey = config?.email?.mailgun?.apiKey;
    this.domain = config?.email?.mailgun?.domain;
  }

  async commitSend(email: EmailParams): Promise<EmailRepsonse> {
    const emailWithDefaults = {
      ...email,
      from: (this.defaultFrom || email.from || "") as string,
    };

    if (!("body" in emailWithDefaults)) {
      throw new Error(
        "Email body isn't set. Either provide one directly or use a template"
      );
    }
    try {
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({
        username: "api",
        key: this.apiKey,
      });

      const messageData = {
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: emailWithDefaults.body,
      };

      const response = await mg.messages.create(this.domain, messageData);

      return {
        id: response.id || `mailgun-${Date.now()}`,
        message: "Email sent successfully via Mailgun",
        metadata: response,
        sentData: emailWithDefaults,
      };
    } catch (error) {
      console.error("Mailgun send error:", error);
      throw new Error("Error sending email via Mailgun", {
        cause: error,
      });
    }
  }
}

export const useMailGun: EmailProviderFactory = () => new MailGunProvider();
