import { getCryptoNetwork } from "./getCryptoNetwork";
import { BigNumber, ethers } from "ethers";

interface CryptoNetworkInfo {
  name: string;
  decimals: number;
}

const CRYPTO_NETWORK_INFO: Record<string, CryptoNetworkInfo> = {
  ethereum: { name: "ethereum", decimals: 18 },
  polygon: { name: "polygon", decimals: 18 },
  binance: { name: "binance", decimals: 18 },
  avalanche: { name: "avalanche", decimals: 18 },
  usdt: { name: "usdt", decimals: 6 },
  ripple: { name: "ripple", decimals: 6 },
  solana: { name: "solana", decimals: 9 },
  bitcoin: { name: "bitcoin", decimals: 8 },
};

export const formatCryptoBalance = (
  network: string,
  balance: string | BigNumber
): string => {
  const formattedNetwork = getCryptoNetwork(network);
  const networkInfo = CRYPTO_NETWORK_INFO[formattedNetwork] || {
    name: formattedNetwork,
    decimals: 18,
  };

  try {
    if (typeof balance === "string") {
      if (balance.includes(".")) {
        return balance;
      }

      return ethers.utils.formatUnits(balance, networkInfo.decimals);
    }

    if (BigNumber.isBigNumber(balance)) {
      return ethers.utils.formatUnits(balance, networkInfo.decimals);
    }

    return "0";
  } catch (error) {
    console.error("Error formatting crypto balance:", error);
    return balance.toString();
  }
};
