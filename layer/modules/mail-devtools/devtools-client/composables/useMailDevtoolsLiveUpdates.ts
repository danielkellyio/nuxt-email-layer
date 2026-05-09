import { onBeforeUnmount, ref } from "vue";

type MailDevtoolsLiveStatus = "live" | "reconnecting" | "offline";

type MailDevtoolsEmailEvent = {
  type: "emails:changed";
  action: "created" | "deleted" | "cleared" | "connected";
  id?: string;
  timestamp: string;
};

type UseMailDevtoolsLiveUpdatesOptions = {
  endpoint?: string;
  coalesceMs?: number;
  fallbackPollMs?: number;
  onInvalidate: (event: MailDevtoolsEmailEvent) => void | Promise<void>;
};

export function useMailDevtoolsLiveUpdates(
  options: UseMailDevtoolsLiveUpdatesOptions,
) {
  const status = ref<MailDevtoolsLiveStatus>("offline");
  const endpoint = options.endpoint ?? "/api/__devtools/emails/stream";
  const coalesceMs = options.coalesceMs ?? 250;
  const fallbackPollMs = options.fallbackPollMs ?? 15_000;

  let eventSource: EventSource | null = null;
  let coalesceTimer: ReturnType<typeof setTimeout> | null = null;
  let fallbackTimer: ReturnType<typeof setInterval> | null = null;
  let latestEvent: MailDevtoolsEmailEvent | null = null;

  const stopFallbackPolling = () => {
    if (!fallbackTimer) {
      return;
    }
    clearInterval(fallbackTimer);
    fallbackTimer = null;
  };

  const startFallbackPolling = () => {
    if (fallbackTimer) {
      return;
    }
    fallbackTimer = setInterval(() => {
      if (!latestEvent) {
        latestEvent = {
          type: "emails:changed",
          action: "connected",
          timestamp: new Date().toISOString(),
        };
      }
      void options.onInvalidate(latestEvent);
    }, fallbackPollMs);
  };

  const scheduleInvalidate = (event: MailDevtoolsEmailEvent) => {
    latestEvent = event;

    if (coalesceTimer) {
      return;
    }

    coalesceTimer = setTimeout(() => {
      coalesceTimer = null;
      if (latestEvent) {
        void options.onInvalidate(latestEvent);
      }
    }, coalesceMs);
  };

  const handlePayload = (rawPayload: string) => {
    try {
      const payload = JSON.parse(rawPayload) as MailDevtoolsEmailEvent;
      if (payload.type !== "emails:changed") {
        return;
      }
      scheduleInvalidate(payload);
    } catch (error) {
      console.error("Failed to parse live update payload:", error);
    }
  };

  const disconnect = () => {
    stopFallbackPolling();

    if (coalesceTimer) {
      clearTimeout(coalesceTimer);
      coalesceTimer = null;
    }

    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }

    status.value = "offline";
  };

  const connect = () => {
    if (import.meta.server || eventSource) {
      return;
    }

    status.value = "reconnecting";
    eventSource = new EventSource(endpoint);

    eventSource.onopen = () => {
      status.value = "live";
      stopFallbackPolling();
    };

    eventSource.onerror = () => {
      status.value = "reconnecting";
      startFallbackPolling();
    };

    eventSource.addEventListener("emails:changed", (message) => {
      const payload = message as MessageEvent<string>;
      handlePayload(payload.data);
    });
  };

  onBeforeUnmount(() => {
    disconnect();
  });

  return {
    status,
    connect,
    disconnect,
  };
}
