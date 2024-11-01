import * as SQLite from "expo-sqlite";
import { Network } from "alchemy-sdk";

const db = SQLite.openDatabase("wallets.db");

export interface IWalletDB {
  id?: number;
  name: string;
  address: string;
  network: Network;
  balance?: string;
  last_balance_update?: string;
  created_at?: string;
}

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS wallets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          network TEXT NOT NULL,
          balance TEXT,
          last_balance_update TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )`,
        [],
        () => resolve(true),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const insertWallet = (wallet: IWalletDB) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO wallets (
          name, 
          address, 
          network, 
          balance, 
          last_balance_update
        ) VALUES (?, ?, ?, ?, ?)`,
        [
          wallet.name,
          wallet.address,
          wallet.network,
          wallet.balance ?? "0",
          wallet.last_balance_update ?? new Date().toISOString(),
        ],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const updateWalletBalance = (
  address: string,
  balance: string,
  network: Network
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE wallets 
         SET balance = ?, 
             last_balance_update = ? 
         WHERE address = ? AND network = ?`,
        [balance, new Date().toISOString(), address, network],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getAllWallets = () => {
  return new Promise<IWalletDB[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM wallets ORDER BY created_at DESC",
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
