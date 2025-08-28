export type EmailProviders = "mailgun" | "mailcatcher";

export type EmailParams = {
  from?: string;
  to: string;
  subject: string;
  body: string;
};

export type EmailRepsonse = {
  id: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: Record<string, any>;
  sentData: EmailParams;
};

export type EmailProvider = {
  name: string;
  send: (email: EmailParams) => Promise<EmailRepsonse>;
};

export type EmailProviderFactory = () => EmailProvider;
