import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("wallets.db");

export const initWalletsDatabase = async (): Promise<void> => {
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS wallets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      network TEXT NOT NULL,
      balance TEXT,
      last_balance_update TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`);
  } catch (error) {
    console.error("Error initializing wallets database:", error);
    throw error;
  }
};
