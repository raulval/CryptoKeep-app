import {
  convertCryptoOrFiat,
  EActionToConvertCryptoOrFiat,
} from "@/common/helpers/convertCryptoOrFiat";
import { formatCryptoBalance } from "@/common/helpers/formatCryptoBalance";
import useGetQuotation from "@/services/api.config.coingecko";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLanguageStore } from "@/store/languageStore";
import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { View, ActivityIndicator, Text } from "react-native";
import Icon from "react-native-ico-cryptocurrency";

interface PortfolioCardsProps {
  item: { crypto: string; cryptoCurrency: string; amount: number };
}

export const PortfolioCards = ({ item }: PortfolioCardsProps) => {
  const { theme } = useThemeStore();
  const { currencyCode } = useCurrencyStore();
  const { language } = useLanguageStore();
  const { data, isLoading } = useGetQuotation(
    [item.crypto.toLowerCase()],
    currencyCode
  );

  const loadingValue = () => {
    const priceExists = data?.[0]?.current_price;
    if (isLoading) {
      return <ActivityIndicator size="small" color={colors.primary} />;
    } else if (priceExists) {
      return convertCryptoOrFiat({
        value: item.amount,
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
        <Icon name={item.cryptoCurrency.toLowerCase()} height={24} width={24} />
        <View className="flex flex-col justify-center">
          <Text className="text-[12px] font-normal text-light-text2 dark:text-dark-text2">
            {item.crypto}
          </Text>
          <Text className="text-[12px] font-bold text-light-text dark:text-dark-text">
            {item.cryptoCurrency}
          </Text>
        </View>
      </View>
      <View className="flex flex-col mt-auto justify-between flex-wrap">
        <Text className="text-[14px] font-bold text-light-text dark:text-dark-text">
          {loadingValue()}
        </Text>
        <Text className="text-[14px] text-end font-normal text-light-text2 dark:text-dark-text2">
          {item.cryptoCurrency} {formatCryptoBalance(item.crypto, item.amount)}
        </Text>
      </View>
    </View>
  );
};
