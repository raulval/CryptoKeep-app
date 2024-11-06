import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, View } from "react-native";
import React from "react";
import { PortfolioCards } from "./components/PortfolioCards";
import { usePortfolio } from "@/services/requests/portfolio/usePortfolio";
import { colors } from "@/theme/colors";
import { useTranslation } from "react-i18next";
import { useSearchStore } from "@/store/searchStore";

const ItemSeparator = () => <View className="w-4" />;

export const PortfolioList = () => {
  const { portfolio, isLoading } = usePortfolio();
  const { search } = useSearchStore();
  const { t } = useTranslation("home");

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <View>
      {portfolio.length > 0 && !search && (
        <View className="flex flex-col gap-4">
          <Text className="px-[24px] text-[18px] font-bold text-light-text dark:text-dark-text">
            {t("My Portfolio")}
          </Text>
          <View className="h-fit">
            <FlashList
              data={portfolio}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={ItemSeparator}
              keyExtractor={(item) => `${item.id}-${item.network}`}
              estimatedItemSize={200}
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: 8,
              }}
              renderItem={({ item }) => <PortfolioCards item={item} />}
            />
          </View>
        </View>
      )}
    </View>
  );
};
