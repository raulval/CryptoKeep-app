import { Network } from "alchemy-sdk";

export const getNetworkRpc = (network: Network) => {
  switch (network) {
    case Network.MATIC_AMOY:
      return "https://rpc.ankr.com/polygon_amoy";
    case Network.MATIC_MAINNET:
      return "https://rpc.ankr.com/polygon";
    case Network.ETH_MAINNET:
      return "https://rpc.ankr.com/eth";
    case Network.BNB_MAINNET:
      return "https://rpc.ankr.com/bsc";
    case Network.AVAX_MAINNET:
      return "https://rpc.ankr.com/avalanche";
    default:
      return "https://rpc.ankr.com/eth";
  }
};
