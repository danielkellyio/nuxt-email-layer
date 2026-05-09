import { mkdirSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import Database from "better-sqlite3";
import type { SentEmailData } from "../libs/useEmail/types";
import { emitMailDevtoolsEmailEvent } from "./mail-devtools-events";

type MailCatcherEmailRow = {
  id: string;
  from_email: string | null;
  to_email: string;
  subject: string;
  body: string;
  text_body: string;
  created_at: string;
};

export type MailCatcherEmail = SentEmailData & {
  id: string;
  timestamp: string;
};

const dbConnections = new Map<string, InstanceType<typeof Database>>();

function resolveDatabasePath() {
  const config = useRuntimeConfig();
  const configuredPath =
    config?.email?.mailcatcher?.databasePath || "./.data/mailcatcher.db";
  return isAbsolute(configuredPath)
    ? configuredPath
    : resolve(process.cwd(), configuredPath);
}

function getDatabase() {
  const databasePath = resolveDatabasePath();
  const cached = dbConnections.get(databasePath);
  if (cached) {
    return cached;
  }

  mkdirSync(dirname(databasePath), { recursive: true });

  const db = new Database(databasePath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS caught_emails (
      id TEXT PRIMARY KEY,
      from_email TEXT,
      to_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      text_body TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  dbConnections.set(databasePath, db);
  return db;
}

function rowToEmail(row: MailCatcherEmailRow): MailCatcherEmail {
  return {
    id: row.id,
    from: row.from_email || undefined,
    to: row.to_email,
    subject: row.subject,
    body: row.body,
    text: row.text_body,
    timestamp: row.created_at,
  };
}

export function createCaughtEmail(id: string, email: SentEmailData) {
  const db = getDatabase();
  const timestamp = new Date().toISOString();

  db.prepare(
    `
      INSERT INTO caught_emails (id, from_email, to_email, subject, body, text_body, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    id,
    email.from || null,
    email.to,
    email.subject,
    email.body,
    email.text,
    timestamp,
  );

  emitMailDevtoolsEmailEvent({
    action: "created",
    id,
    timestamp,
  });

  return timestamp;
}

export function getCaughtEmailById(id: string): MailCatcherEmail | null {
  const db = getDatabase();
  const row = db
    .prepare(
      `
        SELECT id, from_email, to_email, subject, body, text_body, created_at
        FROM caught_emails
        WHERE id = ?
      `,
    )
    .get(id) as MailCatcherEmailRow | undefined;

  return row ? rowToEmail(row) : null;
}

export function listCaughtEmails(): MailCatcherEmail[] {
  const db = getDatabase();
  const rows = db
    .prepare(
      `
        SELECT id, from_email, to_email, subject, body, text_body, created_at
        FROM caught_emails
        ORDER BY datetime(created_at) DESC, id DESC
      `,
    )
    .all() as MailCatcherEmailRow[];

  return rows.map(rowToEmail);
}

export function searchCaughtEmails(rawSearch: string): MailCatcherEmail[] {
  const search = rawSearch.trim();
  if (!search) {
    return listCaughtEmails();
  }

  const db = getDatabase();
  const likeSearch = `%${search.toLowerCase()}%`;
  const rows = db
    .prepare(
      `
        SELECT id, from_email, to_email, subject, body, text_body, created_at
        FROM caught_emails
        WHERE
          lower(to_email) LIKE ?
          OR lower(COALESCE(from_email, '')) LIKE ?
          OR lower(subject) LIKE ?
          OR lower(body) LIKE ?
          OR lower(text_body) LIKE ?
          OR lower(created_at) LIKE ?
        ORDER BY datetime(created_at) DESC, id DESC
      `,
    )
    .all(
      likeSearch,
      likeSearch,
      likeSearch,
      likeSearch,
      likeSearch,
      likeSearch,
    ) as MailCatcherEmailRow[];

  return rows.map(rowToEmail);
}

export function deleteCaughtEmailById(id: string) {
  const db = getDatabase();
  const result = db.prepare(`DELETE FROM caught_emails WHERE id = ?`).run(id);

  if (result.changes > 0) {
    emitMailDevtoolsEmailEvent({
      action: "deleted",
      id,
    });
  }

  return result.changes > 0;
}

export function clearCaughtEmails() {
  const db = getDatabase();
  const result = db.prepare(`DELETE FROM caught_emails`).run();

  if (result.changes > 0) {
    emitMailDevtoolsEmailEvent({
      action: "cleared",
    });
  }

  return result.changes;
}
