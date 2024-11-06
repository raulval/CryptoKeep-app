import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("wallets.db");

export const initPortfolioDatabase = async (): Promise<void> => {
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      network TEXT NOT NULL,
      total_balance TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`);
  } catch (error) {
    console.error("Error initializing portfolio database:", error);
    throw error;
  }
};
