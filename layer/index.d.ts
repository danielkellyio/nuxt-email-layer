import type { EmailProviders } from "./server/libs/useEmail";

export type EmailProvider = Parameters<typeof useEmail>[0];
declare module "@nuxt/schema" {
  interface RuntimeConfig {
    email?: {
      provider: EmailProviders;
      defaultFrom: string;
      mailcatcher?: {
        storageKey: string;
      };
      mailgun?: {
        apiKey: string;
        domain: string;
      };
    };
  }
  // interface PublicRuntimeConfig {
  //   // add public runtime config here
  // }
}
