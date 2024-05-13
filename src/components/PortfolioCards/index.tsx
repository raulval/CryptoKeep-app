import {
  EActionToConvertCryptoOrFiat,
  convertCryptoOrFiat,
} from "@/common/helpers/convertCryptoOrFiat";
import { formatCryptoBalance } from "@/common/helpers/formatCryptoBalance";
import useGetQuotation from "@/services/api.config.coingecko";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLanguageStore } from "@/store/languageStore";
import { colors } from "@/theme/colors";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, Text, View } from "react-native";
import Icon from "react-native-ico-cryptocurrency";

export const PortfolioCards = () => {
  const { t } = useTranslation("home");
  const { currencyCode } = useCurrencyStore();
  const { language } = useLanguageStore();
  const { data, isLoading } = useGetQuotation(
    ["bitcoin", "ethereum", "matic-network", "solana", "tether"],
    currencyCode
  );
  const portfolio = [
    {
      crypto: "Bitcoin",
      cryptoCurrency: "BTC",
      amount: 0.00016,
    },
    {
      crypto: "Ethereum",
      cryptoCurrency: "ETH",
      amount: 0.01,
    },
    {
      crypto: "Polygon",
      cryptoCurrency: "MATIC",
      amount: 1.32455,
    },
    {
      crypto: "Solana",
      cryptoCurrency: "SOL",
      amount: 10.345,
    },
    {
      crypto: "Tether",
      cryptoCurrency: "USDT",
      amount: 50000.0,
    },
  ];
  return (
    <FlashList
      data={portfolio}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.cryptoCurrency}
      estimatedItemSize={50}
      ItemSeparatorComponent={() => <View className="w-4" />}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      renderItem={({ item, index }) => (
        <View className="w-[150px] h-[120px] flex flex-col justify-center p-3 bg-light-card dark:bg-dark-card rounded-[10px]">
          <View className="flex flex-row items-center gap-2">
            <Icon
              name={item.cryptoCurrency.toLowerCase()}
              height={24}
              width={24}
            />
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
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                convertCryptoOrFiat({
                  value: item.amount,
                  action: EActionToConvertCryptoOrFiat.CRYPTO_TO_FIAT,
                  quotation: data[index].current_price,
                  localeInfo: { currencyCode, languageTag: language },
                })
              )}
            </Text>
            <Text className="text-[14px] text-end font-normal text-light-text2 dark:text-dark-text2">
              {item.cryptoCurrency}{" "}
              {formatCryptoBalance(item.crypto, item.amount)}
            </Text>
          </View>
        </View>
      )}
    />
  );
};
