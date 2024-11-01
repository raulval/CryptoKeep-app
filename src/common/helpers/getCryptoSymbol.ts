export const getCryptoSymbol = (network: string): string => {
  if (network.includes("ethereum") || network.includes("sepolia")) return "ETH";
  if (network.includes("polygon") || network.includes("amoy")) return "POL";
  if (network.includes("solana")) return "SOL";
  if (network.includes("bitcoin")) return "BTC";
  if (network.includes("ripple")) return "XRP";
  if (network.includes("bnb")) return "BNB";
  if (network.includes("avalanche") || network.includes("avax")) return "AVAX";
  return "ETH"; // fallback para ETH
};
