import "react-native-get-random-values";
import "@ethersproject/shims";
import { Network } from "alchemy-sdk";

export const networks = [
  {
    title: "Ethereum",
    value: Network.LINEA_SEPOLIA, // TODO: change to Network.ETH_MAINNET in prod
  },
  {
    title: "Polygon",
    value: Network.MATIC_AMOY, // TODO: change to Network.MATIC_MAINNET in prod
  },
  {
    title: "Binance",
    value: Network.BNB_MAINNET,
  },
  {
    title: "Avalanche",
    value: Network.AVAX_MAINNET,
  },
];
