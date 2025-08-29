export default defineEventHandler(async (_event) => {
  try {
    const config = useRuntimeConfig();
    const storage = useStorage(
      config.email.mailcatcher?.storageKey || "mailcatcher"
    );

    // Get all keys from storage
    const keys = await storage.getKeys();

    // Delete all emails
    await Promise.all(keys.map((key) => storage.removeItem(key)));

    return {
      success: true,
      message: `Cleared ${keys.length} emails`,
      deletedCount: keys.length,
    };
  } catch (error) {
    console.error("Error clearing emails:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to clear emails",
    });
  }
});
