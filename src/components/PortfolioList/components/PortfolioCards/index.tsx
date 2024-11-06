import {
  convertCryptoOrFiat,
  EActionToConvertCryptoOrFiat,
} from "@/common/helpers/convertCryptoOrFiat";
import { formatCryptoBalance } from "@/common/helpers/formatCryptoBalance";
import { getCryptoCoinId } from "@/common/helpers/getCryptoCoinId";
import { getCryptoNetwork } from "@/common/helpers/getCryptoNetwork";
import { getCryptoSymbol } from "@/common/helpers/getCryptoSymbol";
import useGetQuotation from "@/services/api.config.coingecko";
import { IPortfolioDB } from "@/services/database/portfolio/usePortfolioDatabase";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLanguageStore } from "@/store/languageStore";
import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { View, ActivityIndicator, Text } from "react-native";
import Icon from "react-native-ico-cryptocurrency";

interface PortfolioCardsProps {
  item: IPortfolioDB;
}

export const PortfolioCards = ({ item }: PortfolioCardsProps) => {
  const { theme } = useThemeStore();
  const { currencyCode } = useCurrencyStore();
  const { language } = useLanguageStore();
  const { data, isLoading } = useGetQuotation(
    [getCryptoCoinId(item.network)],
    currencyCode
  );

  const loadingValue = () => {
    const priceExists = data?.[0]?.current_price;
    if (isLoading) {
      return <ActivityIndicator size="small" color={colors.primary} />;
    } else if (priceExists) {
      return convertCryptoOrFiat({
        value: Number(
          formatCryptoBalance(item.network, item.total_balance ?? "0")
        ),
        action: EActionToConvertCryptoOrFiat.CRYPTO_TO_FIAT,
        quotation: data[0].current_price,
        localeInfo: { currencyCode, languageTag: language },
      });
    } else {
      return "--";
    }
  };

  return (
    <View
      className="w-[150px] h-[120px] flex flex-col justify-center p-3 bg-light-card dark:bg-dark-card rounded-[10px]"
      style={
        theme === "light" && {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4.5,
          elevation: 5,
        }
      }
    >
      <View className="flex flex-row items-center gap-2">
        <Icon
          name={getCryptoSymbol(item.network).toLowerCase()}
          height={24}
          width={24}
        />
        <View className="flex flex-col justify-center">
          <Text className="text-[12px] font-normal text-light-text2 dark:text-dark-text2 capitalize">
            {getCryptoNetwork(item.network)}
          </Text>
          <Text className="text-[12px] font-bold text-light-text dark:text-dark-text">
            {getCryptoSymbol(item.network)}
          </Text>
        </View>
      </View>
      <View className="flex flex-col mt-auto justify-between flex-wrap">
        <Text className="text-[14px] font-bold text-light-text dark:text-dark-text">
          {loadingValue()}
        </Text>
        <Text className="text-[14px] text-end font-normal text-light-text2 dark:text-dark-text2">
          {getCryptoSymbol(item.network)}{" "}
          {formatCryptoBalance(item.network, item.total_balance ?? "0")}
        </Text>
      </View>
    </View>
  );
};
