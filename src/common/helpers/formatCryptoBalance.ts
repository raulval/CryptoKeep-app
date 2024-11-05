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

  let weiValue: BigNumber;
  if (typeof balance === "string") {
    weiValue = BigNumber.from(balance);
  } else if (BigNumber.isBigNumber(balance)) {
    weiValue = balance;
  } else {
    return "0";
  }

  const formattedValue = ethers.utils.formatUnits(
    weiValue,
    networkInfo.decimals
  );
  return formattedValue;
};
