import "react-native-get-random-values";
import "@ethersproject/shims";
import { Network } from "alchemy-sdk";
import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("wallets.db");

export interface IPortfolioDB {
  id: number;
  network: Network;
  total_balance?: string;
  created_at?: string;
}

export const insertPortfolio = async (
  network: Network,
  newBalance: string
): Promise<void> => {
  if (!db) {
    console.error("Portfolio Database not initialized");
    return;
  }

  const query = `SELECT * FROM portfolio WHERE network = '${network}'`;
  const result = await db.getFirstAsync<IPortfolioDB>(query);
  if (result) {
    await updatePortfolio(network, newBalance);
    return;
  }

  const statement = await db.prepareAsync(
    `INSERT INTO portfolio (network, total_balance) VALUES ($network, $total_balance)`
  );

  try {
    await statement.executeAsync({
      $network: network,
      $total_balance: newBalance?.toString() ?? "0",
    });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

export const updatePortfolio = async (
  network: Network,
  newBalance: string
): Promise<void> => {
  if (!db) {
    console.error("Portfolio Database not initialized");
    return;
  }

  const hasPortfolio = await db.getFirstAsync<IPortfolioDB>(
    `SELECT * FROM portfolio WHERE network = '${network}'`
  );
  if (!hasPortfolio) {
    await insertPortfolio(network, newBalance);
    return;
  }

  const query = `UPDATE portfolio SET total_balance = total_balance + $new_balance WHERE network = $network`;
  const statement = await db.prepareAsync(query);

  try {
    await statement.executeAsync({
      $new_balance: newBalance,
      $network: network,
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

export const getAllPortfolio = async (): Promise<IPortfolioDB[]> => {
  if (!db) {
    console.error("Database not initialized");
    return [];
  }

  const query = "SELECT * FROM portfolio ORDER BY total_balance DESC";

  try {
    const result = await db.getAllAsync<IPortfolioDB>(query);
    return result;
  } catch (error) {
    console.error("Error retrieving portfolio:", error);
    throw error;
  }
};
