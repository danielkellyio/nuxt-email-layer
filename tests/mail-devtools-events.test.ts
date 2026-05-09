import { describe, expect, test } from "vitest";
import {
  emitMailDevtoolsEmailEvent,
  formatMailDevtoolsSseEvent,
  formatMailDevtoolsSseHeartbeat,
  subscribeToMailDevtoolsEmailEvents,
} from "nuxt-email-layer/server/utils/mail-devtools-events";

describe("mail devtools events", () => {
  test("emits payloads to active subscribers", () => {
    const received: ReturnType<typeof emitMailDevtoolsEmailEvent>[] = [];
    const unsubscribe = subscribeToMailDevtoolsEmailEvents((event) => {
      received.push(event);
    });

    const emitted = emitMailDevtoolsEmailEvent({
      action: "created",
      id: "email_123",
    });

    unsubscribe();

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual(emitted);
    expect(received[0]).toMatchObject({
      type: "emails:changed",
      action: "created",
      id: "email_123",
    });
  });

  test("stops notifying a subscriber after unsubscribe", () => {
    let calls = 0;
    const unsubscribe = subscribeToMailDevtoolsEmailEvents(() => {
      calls += 1;
    });

    unsubscribe();
    emitMailDevtoolsEmailEvent({ action: "cleared" });

    expect(calls).toBe(0);
  });

  test("formats event frames for SSE", () => {
    const frame = formatMailDevtoolsSseEvent({
      type: "emails:changed",
      action: "deleted",
      id: "email_456",
      timestamp: "2026-05-08T21:00:00.000Z",
    });

    expect(frame).toContain("event: emails:changed");
    expect(frame).toContain(
      'data: {"type":"emails:changed","action":"deleted","id":"email_456","timestamp":"2026-05-08T21:00:00.000Z"}',
    );
    expect(frame.endsWith("\n\n")).toBe(true);
  });

  test("formats heartbeat frames for SSE", () => {
    const frame = formatMailDevtoolsSseHeartbeat("heartbeat 123");
    expect(frame).toBe(": heartbeat 123\n\n");
  });
});
