import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { retryWithBackoff } from "nuxt-email-layer/server/utils/email";

describe("retryWithBackoff", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test("returns immediately when the first attempt succeeds", async () => {
    const fn = vi.fn().mockResolvedValue("ok");

    const result = await retryWithBackoff(fn);

    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  test("retries up to the configured attempts limit and throws the last error", async () => {
    const error = new Error("always fails");
    const fn = vi.fn().mockRejectedValue(error);

    const promise = retryWithBackoff(fn, { attempts: 3, initialDelay: 100 });
    const expectation = expect(promise).rejects.toBe(error);

    await vi.runAllTimersAsync();

    await expectation;
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test("succeeds after transient failures and calls onRetry with attempt numbers", async () => {
    const onRetry = vi.fn(async () => {});
    const firstError = new Error("first");
    const secondError = new Error("second");
    const fn = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(firstError)
      .mockRejectedValueOnce(secondError)
      .mockResolvedValue("success");

    const promise = retryWithBackoff(fn, {
      attempts: 5,
      initialDelay: 50,
      onRetry,
    });

    await vi.runAllTimersAsync();

    await expect(promise).resolves.toBe("success");
    expect(fn).toHaveBeenCalledTimes(3);
    expect(onRetry).toHaveBeenCalledTimes(2);
    expect(onRetry).toHaveBeenNthCalledWith(1, firstError, 1);
    expect(onRetry).toHaveBeenNthCalledWith(2, secondError, 2);
  });

  test("uses exponential backoff and respects maxDelay", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const fn = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("1"))
      .mockRejectedValueOnce(new Error("2"))
      .mockRejectedValueOnce(new Error("3"))
      .mockResolvedValue("done");

    const promise = retryWithBackoff(fn, {
      attempts: 5,
      initialDelay: 100,
      factor: 3,
      maxDelay: 250,
    });

    await vi.runAllTimersAsync();
    await expect(promise).resolves.toBe("done");

    const delays = setTimeoutSpy.mock.calls.map((call) => call[1]);
    expect(delays).toEqual([100, 250, 250]);
  });

  test("does not call onRetry when attempts is 1", async () => {
    const onRetry = vi.fn();
    const fn = vi.fn().mockRejectedValue(new Error("no retry"));

    const promise = retryWithBackoff(fn, { attempts: 1, onRetry });

    await expect(promise).rejects.toThrow("no retry");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(onRetry).not.toHaveBeenCalled();
  });
});
