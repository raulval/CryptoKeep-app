export const getCryptoNetwork = (network: string): string => {
  if (network.includes("ethereum") || network.includes("sepolia"))
    return "ethereum";
  if (network.includes("matic") || network.includes("amoy")) return "polygon";
  if (network.includes("solana")) return "solana";
  if (network.includes("bitcoin")) return "bitcoin";
  if (network.includes("ripple")) return "ripple";
  if (network.includes("bnb")) return "binance";
  if (network.includes("avalanche") || network.includes("avax"))
    return "avalanche";
  return "ethereum";
};
