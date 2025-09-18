export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email ID is required",
    });
  }

  try {
    const config = useRuntimeConfig();
    const storage = useStorage(
      config?.email?.mailcatcher?.storageKey || "mailcatcher"
    );

    // Check if email exists
    const email = await storage.getItem(id);
    if (!email) {
      throw createError({
        statusCode: 404,
        statusMessage: "Email not found",
      });
    }

    // Delete the email
    await storage.removeItem(id);

    return {
      success: true,
      message: "Email deleted successfully",
    };
  } catch (error) {
    // @ts-expect-error - TODO: fix this
    if ("statusCode" in error) {
      throw error;
    }

    console.error("Error deleting email:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete email",
    });
  }
});
