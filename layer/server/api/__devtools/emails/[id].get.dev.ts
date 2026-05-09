import { getCaughtEmailById } from "#layers/email/server/utils/mailcatcher-sqlite";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email ID is required",
    });
  }

  try {
    const email = getCaughtEmailById(id);

    if (!email) {
      throw createError({
        statusCode: 404,
        statusMessage: "Email not found",
      });
    }

    return email;
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
