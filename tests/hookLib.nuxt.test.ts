import { describe, it, expect, vi } from "vitest";
import { createHooks } from "../layer/server/libs/hookLib";

describe("hookLib", () => {
  describe("createHooks", () => {
    it("should create hook and callHook functions", () => {
      const { hook, callHook } = createHooks<{
        "test:event": (payload: string, context: { id: number }) => string;
      }>();

      expect(hook).toBeTypeOf("function");
      expect(callHook).toBeTypeOf("function");
    });

    it("should register and call a single hook", () => {
      const { hook, callHook } = createHooks<{
        "send:before": (
          payload: { message: string },
          context: { provider: string }
        ) => { message: string };
      }>();

      const mockCallback = vi.fn((payload, context) => {
        return { message: `Modified: ${payload.message}` };
      });

      hook("send:before", mockCallback);

      const result = callHook(
        "send:before",
        { message: "Hello" },
        { provider: "test" }
      );

      expect(mockCallback).toHaveBeenCalledWith(
        { message: "Hello" },
        { provider: "test" }
      );
      expect(result).toEqual({ message: "Modified: Hello" });
    });

    it("should call multiple hooks in registration order with chaining", () => {
      const { hook, callHook } = createHooks<{
        "transform:data": (
          payload: { value: number },
          context: { multiplier: number }
        ) => { value: number };
      }>();

      const firstCallback = vi.fn((payload, context) => {
        return { value: payload.value + 10 };
      });

      const secondCallback = vi.fn((payload, context) => {
        return { value: payload.value * context.multiplier };
      });

      hook("transform:data", firstCallback);
      hook("transform:data", secondCallback);

      const result = callHook(
        "transform:data",
        { value: 5 },
        { multiplier: 2 }
      );

      expect(firstCallback).toHaveBeenCalledWith(
        { value: 5 },
        { multiplier: 2 }
      );
      expect(secondCallback).toHaveBeenCalledWith(
        { value: 15 },
        { multiplier: 2 }
      );
      expect(result).toEqual({ value: 30 });
    });

    it("should prevent duplicate hook registration", () => {
      const { hook, callHook } = createHooks<{
        "test:event": (payload: string, context: object) => string;
      }>();

      const callback = vi.fn((payload) => `processed: ${payload}`);

      hook("test:event", callback);
      hook("test:event", callback); // Register same callback again

      const result = callHook("test:event", "data", {});

      expect(callback).toHaveBeenCalledTimes(1);
      expect(result).toBe("processed: data");
    });

    it("should return original payload when no hooks are registered", () => {
      const { callHook } = createHooks<{
        "empty:event": (
          payload: { data: string },
          context: object
        ) => { data: string };
      }>();

      const payload = { data: "unchanged" };
      const result = callHook("empty:event", payload, {});

      expect(result).toEqual(payload);
    });

    it("should handle hooks that modify payload structure", () => {
      const { hook, callHook } = createHooks<{
        "enrich:user": (
          payload: { id: number },
          context: { source: string }
        ) => { id: number; name?: string; email?: string };
      }>();

      hook("enrich:user", (payload, context) => {
        return { ...payload, name: "John Doe" };
      });

      hook("enrich:user", (payload, context) => {
        return { ...payload, email: "john@example.com" };
      });

      const result = callHook("enrich:user", { id: 1 }, { source: "database" });

      expect(result).toEqual({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });
    });

    it("should handle hooks that throw errors", () => {
      const { hook, callHook } = createHooks<{
        "validate:input": (
          payload: { value: string },
          context: object
        ) => { value: string };
      }>();

      hook("validate:input", (payload) => {
        if (payload.value === "invalid") {
          throw new Error("Invalid input");
        }
        return payload;
      });

      expect(() => {
        callHook("validate:input", { value: "invalid" }, {});
      }).toThrow("Invalid input");

      // Should work with valid input
      const result = callHook("validate:input", { value: "valid" }, {});
      expect(result).toEqual({ value: "valid" });
    });

    it("should work with email sending use case", () => {
      type EmailPayload = {
        to: string;
        from: string;
        subject: string;
        body: string;
      };
      type EmailContext = { provider: string; userId?: number };

      const { hook, callHook } = createHooks<{
        "email:send:before": (
          payload: EmailPayload,
          context: EmailContext
        ) => EmailPayload;
        "email:send:after": (
          payload: EmailPayload,
          context: EmailContext
        ) => EmailPayload;
      }>();

      // Hook to add user tracking
      hook("email:send:before", (payload, context) => {
        return {
          ...payload,
          subject: `[${context.provider.toUpperCase()}] ${payload.subject}`,
        };
      });

      // Hook to validate email
      hook("email:send:before", (payload, context) => {
        if (!payload.to.includes("@")) {
          throw new Error("Invalid email address");
        }
        return payload;
      });

      // Hook for logging
      const logCallback = vi.fn((payload, context) => payload);
      hook("email:send:after", logCallback);

      const emailPayload: EmailPayload = {
        to: "user@example.com",
        from: "noreply@example.com",
        subject: "Welcome",
        body: "Welcome to our service!",
      };

      const context: EmailContext = { provider: "mailgun", userId: 123 };

      // Test before hooks
      const processedPayload = callHook(
        "email:send:before",
        emailPayload,
        context
      );
      expect(processedPayload.subject).toBe("[MAILGUN] Welcome");

      // Test after hooks
      callHook("email:send:after", processedPayload, context);
      expect(logCallback).toHaveBeenCalledWith(processedPayload, context);

      // Test validation error
      expect(() => {
        callHook(
          "email:send:before",
          { ...emailPayload, to: "invalid-email" },
          context
        );
      }).toThrow("Invalid email address");
    });

    it("should support complex data transformations", () => {
      const { hook, callHook } = createHooks<{
        "data:process": (
          payload: any[],
          context: { operation: string }
        ) => any[];
      }>();

      // Filter hook
      hook("data:process", (payload, context) => {
        if (context.operation === "filter") {
          return payload.filter((item) => item.active);
        }
        return payload;
      });

      // Transform hook
      hook("data:process", (payload, context) => {
        if (context.operation === "filter") {
          return payload.map((item) => ({ ...item, processed: true }));
        }
        return payload;
      });

      const testData = [
        { id: 1, active: true, name: "Item 1" },
        { id: 2, active: false, name: "Item 2" },
        { id: 3, active: true, name: "Item 3" },
      ];

      const result = callHook("data:process", testData, {
        operation: "filter",
      });

      expect(result).toEqual([
        { id: 1, active: true, name: "Item 1", processed: true },
        { id: 3, active: true, name: "Item 3", processed: true },
      ]);
    });

    it("should handle multiple different hook types", () => {
      const { hook, callHook } = createHooks<{
        "user:login": (
          payload: { username: string },
          context: { ip: string }
        ) => { username: string; loginTime?: Date };
        "user:logout": (
          payload: { username: string },
          context: { sessionId: string }
        ) => { username: string };
        "api:request": (
          payload: { url: string },
          context: { headers: Record<string, string> }
        ) => { url: string };
      }>();

      const loginCallback = vi.fn((payload, context) => ({
        ...payload,
        loginTime: new Date(),
      }));
      const logoutCallback = vi.fn((payload) => payload);
      const requestCallback = vi.fn((payload) => payload);

      hook("user:login", loginCallback);
      hook("user:logout", logoutCallback);
      hook("api:request", requestCallback);

      // Test different hook types work independently
      callHook("user:login", { username: "john" }, { ip: "127.0.0.1" });
      callHook("user:logout", { username: "john" }, { sessionId: "abc123" });
      callHook("api:request", { url: "/api/users" }, { headers: {} });

      expect(loginCallback).toHaveBeenCalledTimes(1);
      expect(logoutCallback).toHaveBeenCalledTimes(1);
      expect(requestCallback).toHaveBeenCalledTimes(1);
    });
  });
});
