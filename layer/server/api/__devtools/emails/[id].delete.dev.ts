import { deleteCaughtEmailById } from "#layers/email/server/utils/mailcatcher-sqlite";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email ID is required",
    });
  }

  try {
    deleteCaughtEmailById(id);

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
