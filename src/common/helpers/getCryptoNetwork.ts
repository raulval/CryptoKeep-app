export const getCryptoNetwork = (network: string): string => {
  const lowercaseNetwork = network.toLowerCase();
  const networkMap: Record<string, string> = {
    ethereum: "ethereum",
    sepolia: "ethereum",
    matic: "polygon",
    amoy: "polygon",
    polygon: "polygon",
    solana: "solana",
    bitcoin: "bitcoin",
    ripple: "ripple",
    bnb: "binance",
    avalanche: "avalanche",
    avax: "avalanche",
    tether: "tether",
    usdt: "tether",
  };

  for (const [key, value] of Object.entries(networkMap)) {
    if (lowercaseNetwork.includes(key)) {
      return value;
    }
  }

  return "ethereum";
};
