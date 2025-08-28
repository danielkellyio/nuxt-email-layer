export const createHooks = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, (payload: any, context: any) => any>,
>() => {
  type HookNames = keyof T;

  const hooks = new Map<HookNames, T[HookNames][]>();

  function hook<K extends HookNames>(name: K, callback: T[K]) {
    const existingHooks = hooks.get(name) || [];
    if (existingHooks.includes(callback)) {
      return;
    }
    hooks.set(name, [...existingHooks, callback]);
  }

  function callHook<K extends HookNames>(
    name: K,
    payload: Parameters<T[K]>[0],
    context: Parameters<T[K]>[1],
  ): ReturnType<T[K]> {
    const callbacks = hooks.get(name) || [];
    return callbacks.reduce((acc, callback) => {
      return callback(acc, context);
    }, payload);
  }

  return {
    hook,
    callHook,
  };
};

/**
 * Examples
 * ---------------------


type Payload = { to: string, from: string }
type Context = { provider: string }

const { hook, callHook } = createHooks<{
  "send:before": (
      payload: Payload,
      context: Context,
    ) => Payload
}>();

// end developers can hook into events
hook("send:before", (payload, context) => {
  // do something with payload and context
  // and maybe return an altered payload
  // or just throw an error
  // or perform some side effect
  return payload;
});

// library authors can call hooks
callHook("send:before", { to: "12", from: "12" }, { provider: "12" });

*/
