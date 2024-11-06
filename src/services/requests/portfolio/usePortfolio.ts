import {
  QueryObserverSuccessResult,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { getAllPortfolio } from "@/services/database/portfolio/usePortfolioDatabase";
import { getCryptoNetwork } from "@/common/helpers/getCryptoNetwork";
import {
  convertCryptoOrFiat,
  EActionToConvertCryptoOrFiat,
} from "@/common/helpers/convertCryptoOrFiat";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLanguageStore } from "@/store/languageStore";
import { fetchCoins } from "@/services/api.config.coingecko";
import { getCryptoCoinId } from "@/common/helpers/getCryptoCoinId";
import { formatCryptoBalance } from "@/common/helpers/formatCryptoBalance";

export const usePortfolio = () => {
  const { currencyCode } = useCurrencyStore();
  const { language } = useLanguageStore();

  const { data: portfolio = [], isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getAllPortfolio,
  });

  const quotationDataList = useQueries({
    queries: portfolio.map((item) => ({
      queryKey: [getCryptoCoinId(item.network), currencyCode],
      queryFn: () => fetchCoins([getCryptoCoinId(item.network)], currencyCode),
      staleTime: 2 * 60 * 1000,
    })),
  });

  const isLoadingQuotations = quotationDataList.some(
    (query) => query.isLoading
  );

  const {
    data: totalBalance,
    isFetching: isLoadingMainBalance,
    error: mainBalanceError,
  } = useQuery({
    queryKey: ["mainBalance"],
    queryFn: () => {
      if (isLoadingQuotations) return 0;

      const portfolioData = portfolio.map((item, index) => {
        const { data: quotationData, error } = quotationDataList[index];

        if (error) {
          console.error("Erro na cotação:", error);
          return { ...item, totalBalance: 0 };
        }

        const network = getCryptoNetwork(item.network);
        const formattedBalance = formatCryptoBalance(
          item.network,
          item.total_balance ?? "0"
        );

        return {
          ...item,
          network,
          totalBalance: convertCryptoOrFiat({
            value: Number(formattedBalance),
            action: EActionToConvertCryptoOrFiat.CRYPTO_TO_FIAT,
            quotation: quotationData[0]?.current_price || 0,
            localeInfo: { currencyCode, languageTag: language },
            withSymbol: false,
            noFormat: true,
          }),
        };
      });

      return portfolioData.reduce(
        (total, item) => total + Number(item.totalBalance),
        0
      );
    },
    enabled: portfolio.length > 0 && !isLoadingQuotations,
  });

  return {
    portfolio,
    isLoading,
    mainBalance: totalBalance,
    isLoadingMainBalance,
    mainBalanceError,
  };
};
