import { Network, Alchemy } from "alchemy-sdk";
import { JsonRpcProvider } from "ethers";

const settingsAlchemy = {
  apiKey: process.env.ALCHEMY_API_KEY_POLYGON_AMOY,
  network: Network.MATIC_AMOY,
};

export const alchemy = new Alchemy(settingsAlchemy);

// export const provider = new ethers.providers.AlchemyProvider(
//   // "mainnet",
//   "goerli",
//   ALCHEMY_API_KEY_ETHEREUM_MAINNET,
// );

//TESTNET POLYGON AMOY PROVIDER
export const provider = new JsonRpcProvider(
  process.env.ALCHEMY_HTTP_KEY_POLYGON_AMOY
);
