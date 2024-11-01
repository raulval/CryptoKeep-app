import { Network } from "alchemy-sdk";

export interface IWallet {
  name: string;
  address: string;
  crypto: string;
  network: Network;
  symbol: string;
  amount: number;
}
