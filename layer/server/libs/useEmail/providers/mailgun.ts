import type {
  EmailParamsWithBody,
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

  async commitSend(email: EmailParamsWithBody): Promise<EmailRepsonse> {
    try {
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({
        username: "api",
        key: this.apiKey,
      });

      const mailgunFormattedMessage = {
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: email.body,
      };

      const response = await mg.messages.create(
        this.domain,
        mailgunFormattedMessage
      );

      if (!response.id) {
        throw new Error("Mailgun response id is missing");
      }

      return {
        id: response.id,
        message: "Email sent successfully via Mailgun",
        metadata: response,
        sentData: email,
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
