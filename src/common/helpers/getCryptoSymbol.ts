export const getCryptoSymbol = (network: string): string => {
  const lowercaseNetwork = network.toLowerCase();
  const symbolMap: Record<string, string> = {
    ethereum: "ETH",
    sepolia: "ETH",
    polygon: "MATIC",
    amoy: "MATIC",
    matic: "MATIC",
    solana: "SOL",
    bitcoin: "BTC",
    ripple: "XRP",
    bnb: "BNB",
    avalanche: "AVAX",
    avax: "AVAX",
  };

  for (const [key, value] of Object.entries(symbolMap)) {
    if (lowercaseNetwork.includes(key)) {
      return value;
    }
  }

  return "ETH"; // fallback para ETH
};
