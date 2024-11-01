import { FlashList } from "@shopify/flash-list";
import { View, ActivityIndicator, Text } from "react-native";
import { WalletCard } from "./components/WalletCard";
import { useWallets } from "@/services/requests/wallets/useWallets";
import { colors } from "@/theme/colors";
import { useTranslation } from "react-i18next";

const ItemSeparator = () => <View className="h-5" />;

export const WalletsList = () => {
  const { wallets, isLoading } = useWallets();
  const { t } = useTranslation("home");

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const EmptyState = () => {
    return (
      <Text className="text-center text-lg font-medium text-dark-text2">
        {t("No wallets found")}
      </Text>
    );
  };

  return (
    <View className="h-full w-full">
      <FlashList
        data={wallets}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.address}
        estimatedItemSize={200}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 12 }}
        renderItem={({ item }) => <WalletCard item={item} />}
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
};
