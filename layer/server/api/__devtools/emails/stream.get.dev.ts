import {
  formatMailDevtoolsSseEvent,
  formatMailDevtoolsSseHeartbeat,
  subscribeToMailDevtoolsEmailEvents,
} from "#layers/email/server/utils/mail-devtools-events";

const HEARTBEAT_INTERVAL_MS = 25_000;

export default defineEventHandler(async (event) => {
  const { req, res } = event.node;

  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache, no-transform");
  setHeader(event, "Connection", "keep-alive");
  setHeader(event, "X-Accel-Buffering", "no");

  res.write("retry: 2000\n\n");

  const writeEvent = (payload: Parameters<typeof formatMailDevtoolsSseEvent>[0]) => {
    res.write(formatMailDevtoolsSseEvent(payload));
  };

  const unsubscribe = subscribeToMailDevtoolsEmailEvents((payload) => {
    writeEvent(payload);
  });

  writeEvent({
    type: "emails:changed",
    action: "connected",
    timestamp: new Date().toISOString(),
  });

  const heartbeatTimer = setInterval(() => {
    res.write(formatMailDevtoolsSseHeartbeat(`heartbeat ${Date.now()}`));
  }, HEARTBEAT_INTERVAL_MS);

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) {
      return;
    }
    cleanedUp = true;
    clearInterval(heartbeatTimer);
    unsubscribe();
    res.end();
  };

  req.on("close", cleanup);
  req.on("error", cleanup);

  await new Promise<void>((resolve) => {
    req.on("close", resolve);
    req.on("aborted", resolve);
  });
});
