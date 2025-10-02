import type { Component } from "vue";

export type EmailProviders = "mailgun" | "mailcatcher";

export type BaseEmailParams = {
  from?: string;
  to: string;
  subject: string;
};

export type EmailParamsWithTemplate = {
  template: Component;
  data?: Record<string, unknown>;
} & BaseEmailParams;

export type EmailParamsWithBody = {
  body: string;
} & BaseEmailParams;

export type EmailParams = EmailParamsWithBody | EmailParamsWithTemplate;

export type SentEmailData = EmailParams & {
  body: string;
};

export type EmailRepsonse = {
  id: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: Record<string, any>;
  sentData: SentEmailData;
};

export type EmailProvider = {
  name: string;
  send: (email: EmailParams) => Promise<EmailRepsonse>;
};

export type EmailProviderFactory = () => EmailProvider;
