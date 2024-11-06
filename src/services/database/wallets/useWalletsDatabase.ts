import "react-native-get-random-values";
import "@ethersproject/shims";
import { Network } from "alchemy-sdk";
import { openDatabaseSync } from "expo-sqlite";
import {
  insertPortfolio,
  updatePortfolio,
} from "../portfolio/usePortfolioDatabase";

const db = openDatabaseSync("wallets.db");

export interface IWalletDB {
  id: number;
  name: string;
  address: string;
  network: Network;
  balance?: string;
  last_balance_update?: string;
  created_at?: string;
}

// Insere uma nova carteira
export const insertWallet = async (
  wallet: Omit<IWalletDB, "id">
): Promise<void> => {
  if (!db) {
    return console.error("Database not initialized");
  }

  const statement = await db.prepareAsync(
    `INSERT INTO wallets (
      name, 
      address, 
      network, 
      balance, 
      last_balance_update
      ) VALUES ($name, $address, $network, $balance, $last_balance_update)`
  );

  try {
    await statement.executeAsync({
      $name: wallet.name,
      $address: wallet.address,
      $network: wallet.network,
      $balance: wallet.balance ?? "0",
      $last_balance_update:
        wallet.last_balance_update ?? new Date().toISOString(),
    });

    await insertPortfolio(wallet.network, wallet.balance ?? "0");
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Atualiza o balance de uma carteira
export const updateWalletBalance = async (
  address: string,
  balance: string,
  network: Network
): Promise<void> => {
  if (!db) {
    return console.error("Database not initialized");
  }

  const statement = await db.prepareAsync(
    `UPDATE wallets 
      SET balance = $balance, 
      last_balance_update = $last_balance_update 
      WHERE address = $address AND network = $network`
  );

  try {
    await statement.executeAsync({
      $balance: balance,
      $last_balance_update: new Date().toISOString(),
      $address: address,
      $network: network,
    });

    await updatePortfolio(network, balance);
  } catch (error) {
    console.error("Error updating wallet balance:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Retorna todas as carteiras
export const getAllWallets = async (search?: string): Promise<IWalletDB[]> => {
  if (!db) {
    console.error("Database not initialized");
    return [];
  }

  if (search) {
    const query = `SELECT * FROM wallets WHERE name LIKE '%${search}%' OR address LIKE '%${search}%'`;
    try {
      const response = await db.getAllAsync<IWalletDB>(query);
      return response;
    } catch (error) {
      console.error("Error retrieving wallets:", error);
      throw error;
    }
  }

  const query = "SELECT * FROM wallets ORDER BY created_at DESC";
  try {
    const response = await db.getAllAsync<IWalletDB>(query);
    return response;
  } catch (error) {
    console.error("Error retrieving wallets:", error);
    throw error;
  }
};
