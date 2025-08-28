import { useMailGun } from "./providers/mailgun";
import { useMailCatcher } from "./providers/mailcatcher";

export function useEmail() {
  const config = useRuntimeConfig();

  if (!config.email.provider) {
    throw new Error("Email provider is not set");
  }
  const map = {
    mailgun: useMailGun,
    mailcatcher: useMailCatcher,
  };
  const providerFactory = map[config.email.provider] || useMailCatcher;
  return providerFactory();
}

export { useMailGun, useMailCatcher };
export type * from "./types";
