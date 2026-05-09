import {
  listCaughtEmails,
  searchCaughtEmails,
} from "#layers/email/server/utils/mailcatcher-sqlite";

function normalizeSearchValue(searchValue: unknown) {
  if (Array.isArray(searchValue)) {
    return String(searchValue[0] ?? "").trim();
  }

  return String(searchValue ?? "").trim();
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const search = normalizeSearchValue(query.search);
    const emails = search ? searchCaughtEmails(search) : listCaughtEmails();

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
