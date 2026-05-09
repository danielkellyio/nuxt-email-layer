export type MailDevtoolsEmailEventAction =
  | "created"
  | "deleted"
  | "cleared"
  | "connected";

export type MailDevtoolsEmailEvent = {
  type: "emails:changed";
  action: MailDevtoolsEmailEventAction;
  id?: string;
  timestamp: string;
};

type MailDevtoolsEmailEventListener = (event: MailDevtoolsEmailEvent) => void;

type MailDevtoolsEventStore = {
  listeners: Set<MailDevtoolsEmailEventListener>;
};

const MAIL_DEVTOOLS_EVENT_STORE_KEY = "__nuxtEmailLayerMailDevtoolsEventStore";

function getMailDevtoolsEventStore(): MailDevtoolsEventStore {
  const globalStore = globalThis as typeof globalThis & {
    [MAIL_DEVTOOLS_EVENT_STORE_KEY]?: MailDevtoolsEventStore;
  };

  if (!globalStore[MAIL_DEVTOOLS_EVENT_STORE_KEY]) {
    globalStore[MAIL_DEVTOOLS_EVENT_STORE_KEY] = {
      listeners: new Set(),
    };
  }

  return globalStore[MAIL_DEVTOOLS_EVENT_STORE_KEY];
}

export function emitMailDevtoolsEmailEvent(
  payload: Omit<MailDevtoolsEmailEvent, "type" | "timestamp"> & {
    timestamp?: string;
  },
): MailDevtoolsEmailEvent {
  const event: MailDevtoolsEmailEvent = {
    type: "emails:changed",
    action: payload.action,
    id: payload.id,
    timestamp: payload.timestamp ?? new Date().toISOString(),
  };
  const store = getMailDevtoolsEventStore();

  for (const listener of store.listeners) {
    listener(event);
  }

  return event;
}

export function subscribeToMailDevtoolsEmailEvents(
  listener: MailDevtoolsEmailEventListener,
) {
  const store = getMailDevtoolsEventStore();
  store.listeners.add(listener);

  return () => {
    store.listeners.delete(listener);
  };
}

export function formatMailDevtoolsSseEvent(event: MailDevtoolsEmailEvent) {
  return `event: emails:changed\ndata: ${JSON.stringify(event)}\n\n`;
}

export function formatMailDevtoolsSseHeartbeat(comment = "heartbeat") {
  return `: ${comment}\n\n`;
}
