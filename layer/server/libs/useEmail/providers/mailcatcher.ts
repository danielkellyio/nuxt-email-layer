import type {
  EmailParamsWithBody,
  EmailRepsonse,
  EmailProviderFactory,
} from "../types";
import { nanoid } from "nanoid";
import { BaseProvider } from "./base";
import { createCaughtEmail } from "../../../utils/mailcatcher-sqlite";

class MailCatcherProvider extends BaseProvider {
  name = "mailcatcher" as const;
  async commitSend(email: EmailParamsWithBody): Promise<EmailRepsonse> {
    try {
      const id = nanoid(24);
      createCaughtEmail(id, email);
      return {
        id,
        message: "Email saved to mailcatcher SQLite database for devtools",
        metadata: {},
        sentData: email,
      };
    } catch (error) {
      console.error("Mailcatcher send error:", error);
      throw new Error("Error sending email to mailcatcher.", {
        cause: error,
      });
    }
  }
}

export const useMailCatcher: EmailProviderFactory = () =>
  new MailCatcherProvider();
