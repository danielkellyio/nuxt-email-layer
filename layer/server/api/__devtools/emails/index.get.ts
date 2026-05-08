import { listCaughtEmails } from "#layers/email/server/utils/mailcatcher-sqlite";

export default defineEventHandler(async (_event) => {
  try {
    const emails = listCaughtEmails();

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
