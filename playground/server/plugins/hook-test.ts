export default defineNitroPlugin(async () => {
  emailLayerHooks.hook("send:after", (payload, context) => {
    console.log("after email", payload, context);
    return payload;
  });

  emailLayerHooks.hook("send:before", (payload, context) => {
    payload.subject = "changed from hook";
    console.log("before email", payload, context);
    return payload;
  });
});
