import type {
  EmailParamsWithBody,
  EmailRepsonse,
  EmailProviderFactory,
} from "../types";
import { nanoid } from "nanoid";
import { BaseProvider } from "./base";

class MailCatcherProvider extends BaseProvider {
  name = "mailcatcher" as const;
  async commitSend(email: EmailParamsWithBody): Promise<EmailRepsonse> {
    try {
      const storage = this.useStorage();
      const id = nanoid(24);
      await storage.setItem(id, email);
      return {
        id,
        message:
          "Email saved to mailcatcher storage for review in the devtools",
        metadata: {},
        sentData: {
          ...email,
          from: this.defaultFrom || email.from || "",
        },
      };
    } catch (error) {
      console.error("Mailcatcher send error:", error);
      throw new Error("Error sending email to mailcatcher.", {
        cause: error,
      });
    }
  }
  useStorage() {
    const config = useRuntimeConfig();
    return useStorage(config?.email?.mailcatcher?.storageKey || "mailcatcher");
  }
}

export const useMailCatcher: EmailProviderFactory = () =>
  new MailCatcherProvider();
