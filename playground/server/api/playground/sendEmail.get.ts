export default defineEventHandler(async (event) => {
  return await useEmail().send({
    to: "me@danielkelly.io",
    subject: "Test",
    body: "<p>Test</p>",
  });
});
