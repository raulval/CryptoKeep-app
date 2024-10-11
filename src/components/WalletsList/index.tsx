import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { WalletCard } from "./components/WalletCard";
import { IWallet } from "@/interfaces/wallets";

const ItemSeparator = () => <View className="h-5" />;

export const WalletsList = () => {
  const wallets: IWallet[] = [
    {
      name: "Coinbase",
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      crypto: "Ethereum",
      amount: 0.1253,
    },
    {
      name: "Kraken",
      address: "0x8e0b7e6062272bad8f8315579ac72de9d6ec1948",
      crypto: "Ethereum",
      amount: 0.00523,
    },
    {
      name: "MetaMask",
      address: "0x9c3c9283e94d486102aa93963ac59a4d915f9e33",
      crypto: "Ethereum",
      amount: 0.02,
    },
  ];
  return (
    <View className="h-full w-full">
      <FlashList
        data={wallets}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.address}
        estimatedItemSize={200}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        renderItem={({ item, index }) => <WalletCard item={item} />}
      />
    </View>
  );
};
