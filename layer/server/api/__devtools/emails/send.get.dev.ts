export default defineEventHandler(async (_event) => {
  return await useEmail().send({
    to: "me@danielkelly.io",
    subject: "Test",
    body: "<p>Test</p>",
    text: "test",
  });
});
