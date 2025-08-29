import type { SentEmailData } from "#layers/email/server/libs/useEmail/types";
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
      config.email.mailcatcher?.storageKey || "mailcatcher"
    );

    const email = await storage.getItem<SentEmailData>(id);

    if (!email) {
      throw createError({
        statusCode: 404,
        statusMessage: "Email not found",
      });
    }

    return {
      id,
      ...email,
      timestamp: new Date().toISOString(), // TODO: get actual timestamp from storage metadata
    };
  } catch (error) {
    // @ts-expect-error - TODO: fix this
    if ("statusCode" in error) {
      throw error;
    }

    console.error("Error fetching email:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch email",
    });
  }
});
