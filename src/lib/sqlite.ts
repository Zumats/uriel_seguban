import fs from "fs";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var __contactsDb: any | undefined;
}

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  fs.mkdirSync(dataDir, { recursive: true });
  return dataDir;
}

function migrateContacts(db: any) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export function getContactsDb() {
  if (global.__contactsDb) return global.__contactsDb;

  const dataDir = ensureDataDir();
  const dbPath = path.join(dataDir, "contacts.db");
  // Lazy-load native module so build environments don't fail at import time.
  const BetterSqlite3 = require("better-sqlite3");
  const db = new BetterSqlite3(dbPath);

  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  migrateContacts(db);
  global.__contactsDb = db;
  return db;
}

