import { Network } from "alchemy-sdk";

export const getCryptoCoinId = (network: Network): string => {
  switch (network) {
    case Network.ETH_MAINNET:
    case Network.LINEA_SEPOLIA:
    case Network.ETH_SEPOLIA:
      return "ethereum";
    case Network.MATIC_MAINNET:
    case Network.MATIC_AMOY:
      return "matic-network";
    case Network.BNB_MAINNET:
      return "binancecoin";
    default:
      return "ethereum";
  }
};
