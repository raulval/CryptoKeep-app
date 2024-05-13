import { currencyFormat } from "@/common/helpers/currencyFormat";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import Icon from "react-native-ico-cryptocurrency";

export const PortfolioCards = () => {
  const { t } = useTranslation("home");
  const portfolio = [
    {
      crypto: "Bitcoin",
      cryptoCurrency: "BTC",
      amount: 0.00000001,
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
      renderItem={({ item }) => (
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
          <View className="flex flex-row items-center mt-auto justify-between flex-wrap">
            <Text className="text-[14px] font-bold text-light-text dark:text-dark-text">
              {currencyFormat(item.amount)}
            </Text>
            <Text className="text-[14px] font-normal text-light-text2 dark:text-dark-text2">
              {item.amount.toFixed(2)} {item.cryptoCurrency}
            </Text>
          </View>
        </View>
      )}
    />
  );
};
