import { test, expect, describe } from "vitest";
import { useEmail } from "../layer/server/libs/useEmail";

describe("useEmail", () => {
  test("default from is used if no from is provided", async () => {
    const config = useRuntimeConfig();
    config.email.defaultFrom = "default@test.com";
    const res = await useEmail().send({
      to: "test@test.com",
      subject: "test",
      body: "test",
    });

    expect(res.sentData.from).toBe("default@test.com");
  });

  test("useEmail uses the mailgun provider when provider is set to mailgun in nuxt.config.ts", () => {
    const config = useRuntimeConfig();
    config.email.provider = "mailgun";
    config.email.mailgun = {
      apiKey: "test",
      domain: "test",
    };
    // test function name is the same as the provider name
    const provider = useEmail();
    expect(provider.name).toBe("mailgun");
  });

  test("useEmail uses the mailcatcher provider when provider is set to mailcatcher in nuxt.config.ts", () => {
    const config = useRuntimeConfig();
    config.email.provider = "mailcatcher";
    const provider = useEmail();
    expect(provider.name).toBe("mailcatcher");
  });

  test("useEmail().send() takes a template and data", async () => {
    const provider = useEmail();
    const res = await provider.send({
      to: "test@test.com",
      subject: "test",
      template: "hello-world",
      data: {
        title: "some title",
      },
    });

    expect(res.sentData.body).toContain("some title");
    expect(res.sentData.body).toContain(`<html lang="en"`);
  });
});
