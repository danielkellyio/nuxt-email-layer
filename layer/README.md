# nuxt-email-layer

Nuxt layer for building and sending emails with Vue Email.

## Documentation

- [nuxt-email-layer.netlify.app](https://nuxt-email-layer.netlify.app/)

## Providers:

- MailCatcher (Development)
- Mailgun (Production)

## Simple Example

```ts
// nuxt.config.ts (with config)
export default defineNuxtConfig({
  extends: ["nuxt-email-layer"],
  runtimeConfig: {
    email: {
      provider: "mailcatcher",
      defaultFrom: "hello@localhost.dev",
      mailgun: {
        apiKey: "", // NUXT_EMAIL_MAILGUN_API_KEY
        domain: "", // NUXT_EMAIL_MAILGUN_DOMAIN
      },
    },
  },
});
```

```ts [server/api/email-test.post.ts]
export default defineEventHandler(async (event) => {
  const email = useEmail();

  const result = await email.send({
    to: "user@example.com",
    subject: "Hello",
    body: "<html><body><h1>Test email from Nuxt Email Layer.</h1></body></html>",
    text: "Test email from Nuxt Email Layer.",
  });
});
```

See the [docs](https://nuxt-email-layer.netlify.app/) for more information.
