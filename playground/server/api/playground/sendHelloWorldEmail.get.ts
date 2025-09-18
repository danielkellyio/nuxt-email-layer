import Email from "#layers/email/server/emails/two-factor-auth.vue";
export default defineEventHandler(async (event) => {
  return await useEmail().send({
    to: "me@danielkelly.io",
    subject: "Test",
    template: Email,
    data: {
      userName: "Daniel",
      verificationCode: "736023",
      expiresIn: "10 minutes",
      supportUrl: "https://help.example.com",
    },
  });
});
