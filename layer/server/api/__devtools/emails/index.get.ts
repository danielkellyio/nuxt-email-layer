export default defineEventHandler(async (_event) => {
  try {
    const config = useRuntimeConfig();
    const storage = useStorage(
      config?.email?.mailcatcher?.storageKey || "mailcatcher"
    );

    // Get all keys from storage
    const keys = await storage.getKeys();

    // Fetch all emails
    const emails = await Promise.all(
      keys.map(async (key) => {
        const email = (await storage.getItem(key)) as any;
        return {
          id: key,
          ...(email || {}),
          timestamp: new Date().toISOString(), // TODO: get actual timestamp from storage metadata
        };
      })
    );

    // Sort by timestamp (newest first)
    emails.sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return {
      emails,
      total: emails.length,
    };
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch emails",
    });
  }
});
