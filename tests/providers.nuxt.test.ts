import { test, expect, describe } from "vitest";
import { useMailGun, useMailCatcher } from "../layer/server/libs/useEmail";
import type { EmailParams, SentEmailData } from "../layer/server/libs/useEmail";

describe("mailgun provider", () => {
  test("mailgun requires NUXT_EMAIL_MAILGUN_API_KEY and NUXT_EMAIL_MAILGUN_DOMAIN to be set", () => {
    const config = useRuntimeConfig();

    expect(config.email?.mailgun?.apiKey).toBe("");
    expect(config.email?.mailgun?.domain).toBe("");

    expect(() => useMailGun()).toThrow(
      "Mailgun API key and domain are required"
    );
  });
});

describe("mailcatcher provider", () => {
  test("mailcatcher saves email to kv storage", async () => {
    const res = await useMailCatcher().send({
      from: "test@test.com",
      to: "test@test.com",
      subject: "test",
      body: "test",
    });

    const storage = useStorage("mailcatcher");
    const storedEmail = await storage.getItem<SentEmailData>(res.id);

    expect(storedEmail).toBeDefined();
    expect(storedEmail?.from).toBe("test@test.com");
    expect(storedEmail?.to).toBe("test@test.com");
    expect(storedEmail?.subject).toBe("test");
    expect(storedEmail?.body).toBe("test");
  });
});
