import Email from "#layers/email/server/emails/two-factor-auth.vue";
export default defineEventHandler(async (event) => {
  return await useEmail().send({
    to: "me@danielkelly.io",
    subject: "Test",
    template: Email,
    data: {
      title: "My First Email",
    },
  });
});
