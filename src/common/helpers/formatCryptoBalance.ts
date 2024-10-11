import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function round(value: number) {
  return value.toFixed(value % 1 && 5);
}

export const formatCryptoBalance = (cryptoName: string, balance: number) => {
  switch (cryptoName.toLocaleLowerCase()) {
    case "ethereum":
      return round(balance);

    case "polygon":
      return round(balance);

    case "solana": {
      const verifyNumber = String(balance).includes(".");
      return verifyNumber ? round(balance) : round(balance / LAMPORTS_PER_SOL);
    }

    case "bitcoin":
      return balance;

    case "ripple":
      return balance;

    default:
      return balance;
  }
};
