import { IWalletDB } from "@/services/database/wallets/useWalletsDatabase";
import { FlashList } from "@shopify/flash-list";
import { TransactionCard } from "./components/TransactionCard";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

interface WalletTransactionsProps {
  wallet: IWalletDB;
}

const transactions = [
  {
    id: 1,
    from: "0x7F56400fFe6ECc03C5780Fd7b3E717edcb89b196",
    to: "0x12345678901234567890123456789012345678122",
    network: "ethereum",
    amount: "0.01",
  },
  {
    id: 2,
    from: "0x1234567890123456789012345678901234567890",
    to: "0x7F56400fFe6ECc03C5780Fd7b3E717edcb89b196",
    network: "ethereum",
    amount: "0.01",
  },
  {
    id: 3,
    from: "0x1234567890123456789012345678901234567894",
    to: "0x7F56400fFe6ECc03C5780Fd7b3E717edcb89b196",
    network: "ethereum",
    amount: "0.01",
  },
];

const EmptyComponent = () => {
  const { t } = useTranslation("walletDetails");

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-center text-lg font-medium text-dark-text2">
        {t("No transactions found")}
      </Text>
    </View>
  );
};

const ItemSeparator = () => <View className="h-[12px]" />;

export const WalletTransactions = ({ wallet }: WalletTransactionsProps) => {
  return (
    <View className="h-full w-full">
      <FlashList
        data={transactions}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TransactionCard wallet={wallet} transaction={item} />
        )}
        keyExtractor={(item) => `${item.id}`}
        estimatedItemSize={200}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 12,
        }}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
};
