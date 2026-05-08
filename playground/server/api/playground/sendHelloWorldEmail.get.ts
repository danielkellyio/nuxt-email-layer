import Email from "#layers/email/server/emails/two-factor-auth.vue";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const to = query?.to?.toString() || "me@danielkelly.io";
  const subject = query?.subject?.toString() || "Test";
  const userName = query?.userName?.toString() || "Daniel";

  return await useEmail().send({
    to,
    subject,
    template: Email,
    data: {
      userName: userName || "Daniel",
      verificationCode: "736023",
      expiresIn: "10 minutes",
      supportUrl: "https://help.example.com",
    },
  });
});
