import { test, expect, describe, vi, beforeEach } from "vitest";
const { createSpy } = vi.hoisted(() => ({
  createSpy: vi.fn(),
}));

vi.mock("mailgun.js", () => {
  const MailgunMock = vi.fn().mockImplementation(() => ({
    client: vi.fn(() => ({
      messages: {
        create: createSpy,
      },
    })),
  }));

  return {
    default: MailgunMock,
  };
});

import {
  useMailGun,
  useMailCatcher,
} from "nuxt-email-layer/server/libs/useEmail";
import {
  clearCaughtEmails,
  getCaughtEmailById,
  searchCaughtEmails,
} from "nuxt-email-layer/server/utils/mailcatcher-sqlite";

describe("mailgun provider", () => {
  test("mailgun requires NUXT_EMAIL_MAILGUN_API_KEY and NUXT_EMAIL_MAILGUN_DOMAIN to be set", () => {
    const config = useRuntimeConfig();

    expect(config.email?.mailgun?.apiKey).toBe("");
    expect(config.email?.mailgun?.domain).toBe("");

    expect(() => useMailGun()).toThrow(
      "Mailgun API key and domain are required",
    );
  });

  test("useMailGun().send() calls Mailgun SDK messages.create", async () => {
    const config = useRuntimeConfig();
    config.email = {
      ...config.email,
      mailgun: {
        apiKey: "test-api-key",
        domain: "sandbox.example.mailgun.org",
      },
    };

    createSpy.mockReset();
    createSpy.mockResolvedValue({
      id: "<message-id@example.mailgun.org>",
      status: 200,
    });

    await useMailGun().send({
      from: "sender@test.com",
      to: "recipient@test.com",
      subject: "Test Subject",
      body: "<p>Test Body</p>",
      text: "Test Body",
    });

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(
      "sandbox.example.mailgun.org",
      expect.objectContaining({
        from: "sender@test.com",
        to: "recipient@test.com",
        subject: "Test Subject",
        text: "<p>Test Body</p>",
        html: "<p>Test Body</p>",
      }),
    );
  });
});

describe("mailcatcher provider", () => {
  beforeEach(() => {
    clearCaughtEmails();
  });

  test("mailcatcher saves email to sqlite", async () => {
    const res = await useMailCatcher().send({
      from: "test@test.com",
      to: "test@test.com",
      subject: "test",
      body: "test",
      text: "test",
    });

    const storedEmail = getCaughtEmailById(res.id);

    expect(storedEmail).toBeDefined();
    expect(storedEmail?.from).toBe("test@test.com");
    expect(storedEmail?.to).toBe("test@test.com");
    expect(storedEmail?.subject).toBe("test");
    expect(storedEmail?.body).toBe("test");
  });

  test("searchCaughtEmails matches subject and recipient", async () => {
    await useMailCatcher().send({
      from: "noreply@example.com",
      to: "alice@example.com",
      subject: "Invoice Ready",
      body: "<p>Invoice attached</p>",
      text: "Invoice attached",
    });

    await useMailCatcher().send({
      from: "noreply@example.com",
      to: "bob@example.com",
      subject: "Welcome",
      body: "<p>Hello Bob</p>",
      text: "Hello Bob",
    });

    const bySubject = searchCaughtEmails("invoice");
    const byRecipient = searchCaughtEmails("bob@example.com");

    expect(bySubject).toHaveLength(1);
    expect(bySubject[0]?.subject).toBe("Invoice Ready");
    expect(byRecipient).toHaveLength(1);
    expect(byRecipient[0]?.to).toBe("bob@example.com");
  });
});
