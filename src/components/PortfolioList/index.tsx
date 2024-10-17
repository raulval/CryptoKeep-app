import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import React from "react";
import { PortfolioCards } from "./components/PortfolioCards";

const ItemSeparator = () => <View className="w-4" />;

export const PortfolioList = () => {
  const portfolio = [
    {
      crypto: "Bitcoin",
      cryptoCurrency: "BTC",
      amount: 0.016,
    },
    {
      crypto: "Ethereum",
      cryptoCurrency: "ETH",
      amount: 0.01,
    },
    {
      crypto: "matic-network",
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
    <View className="h-fit">
      <FlashList
        data={portfolio}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.cryptoCurrency}
        estimatedItemSize={200}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 8,
        }}
        renderItem={({ item }) => <PortfolioCards item={item} />}
      />
    </View>
  );
};
