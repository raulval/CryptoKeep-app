import { useQuery } from "@tanstack/react-query";

const fetchCoins = async (coinId: string[], fiat = "usd") => {
  const baseUrl = "https://api.coingecko.com/api/v3/coins";
  const ids = coinId?.join(",") || ""; // Handle optional coinIds

  const response = await fetch(
    `${baseUrl}/markets?vs_currency=${fiat}&ids=${ids}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coins");
  }
  return response.json();
};

export default function useGetQuotation(coinId: string[], fiat: string) {
  return useQuery({
    queryKey: ["coins-quotations", coinId, fiat],
    queryFn: () => fetchCoins(coinId, fiat),
    enabled: !!coinId, // Enable query only if coinId are provided
    staleTime: 2 * 60 * 1000, // Cache stale time for 2 minutes
    retry: 2, // Retry failed requests up to 2 times (optional)
  });
}
