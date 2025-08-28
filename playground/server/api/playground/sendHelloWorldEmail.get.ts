import HelloWorld from "#layers/email/server/emails/hello-world.vue";
export default defineEventHandler(async (event) => {
  return await useEmail().send({
    to: "me@danielkelly.io",
    subject: "Test",
    template: HelloWorld,
    data: {
      title: "My First Email",
    },
  });
});
