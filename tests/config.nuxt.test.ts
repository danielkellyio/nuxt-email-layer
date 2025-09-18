import { test, expect, describe, beforeEach } from "vitest";

beforeEach(() => {
  const config = useRuntimeConfig();
  config.email = {
    ...config.email,
    provider: "mailcatcher",
    defaultFrom: "",
  };
});

describe("email layer", () => {
  test("runtime config for email has expected defaults", () => {
    const config = useRuntimeConfig();
    expect(config.email?.provider).toBe("mailcatcher");
    expect(config.email?.mailcatcher?.storageKey).toBe("mailcatcher");
  });
});
