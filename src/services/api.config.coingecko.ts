import { useQuery } from "@tanstack/react-query";

export const fetchCoins = async (coinId: string[], fiat = "usd") => {
  const baseUrl = "https://api.coingecko.com/api/v3/coins";
  const ids = coinId?.join(",") || ""; // Handle optional coinIds

  try {
    const response = await fetch(
      `${baseUrl}/markets?vs_currency=${fiat}&ids=${ids}`
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw new Error("Failed to fetch coins");
  }
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
