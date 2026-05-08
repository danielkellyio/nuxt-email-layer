import { clearCaughtEmails } from "#layers/email/server/utils/mailcatcher-sqlite";

export default defineEventHandler(async (_event) => {
  try {
    const deletedCount = clearCaughtEmails();

    return {
      success: true,
      message: `Cleared ${deletedCount} emails`,
      deletedCount,
    };
  } catch (error) {
    console.error("Error clearing emails:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to clear emails",
    });
  }
});
