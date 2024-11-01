import "react-native-get-random-values";
import "@ethersproject/shims";
import { Alchemy, Network } from "alchemy-sdk";

const ALCHEMY_KEY = process.env.EXPO_PUBLIC_ALCHEMY_API_KEY_TESTNET;

export const useWeb3 = (network: Network) => {
  const config = {
    apiKey: ALCHEMY_KEY,
    network,
  };

  const alchemy = new Alchemy(config);

  const getBalance = async (address: string) => {
    const balance = await alchemy.core.getBalance(address);
    return balance;
  };

  const getTokenMetadata = async (address: string) => {
    try {
      const metadata = await alchemy.core.getTokenMetadata(address);
      return metadata;
    } catch (error) {
      console.error("Error fetching token metadata:", error);
      return null;
    }
  };

  return {
    getBalance,
    getTokenMetadata,
    alchemy,
  };
};
