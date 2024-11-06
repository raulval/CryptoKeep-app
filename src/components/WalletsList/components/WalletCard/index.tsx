import { formatLongString } from "@/common/helpers/formatLongString";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLanguageStore } from "@/store/languageStore";
import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { ethers } from "ethers";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import useGetQuotation from "@/services/api.config.coingecko";
import {
  convertCryptoOrFiat,
  EActionToConvertCryptoOrFiat,
} from "@/common/helpers/convertCryptoOrFiat";
import { formatCryptoBalance } from "@/common/helpers/formatCryptoBalance";
import {
  useGetWalletBalance,
  useWallets,
} from "@/services/requests/wallets/useWallets";
import { useEffect } from "react";
import { getCryptoSymbol } from "@/common/helpers/getCryptoSymbol";
import { getCryptoCoinId } from "@/common/helpers/getCryptoCoinId";
import { getCryptoNetwork } from "@/common/helpers/getCryptoNetwork";
import { IWalletDB } from "@/services/database/wallets/useWalletsDatabase";

export const WalletCard = ({ item }: { item: IWalletDB }) => {
  const { theme } = useThemeStore();
  const { currencyCode } = useCurrencyStore();
  const { language } = useLanguageStore();
  const { updateBalance } = useWallets();

  const { data: balance, isLoading: isLoadingBalance } = useGetWalletBalance(
    item.address,
    item.network,
    {
      refetchInterval: 60000, // Atualiza a cada 60 segundos
    }
  );

  useEffect(() => {
    if (balance && balance.toString() !== item.balance) {
      updateBalance({
        address: item.address,
        balance: balance.toString(),
        network: item.network,
      });
    }
  }, [balance, item.balance, item.address, item.network, updateBalance]);

  const symbol = getCryptoSymbol(item.network);
  const coinId = getCryptoCoinId(item.network);

  const { data: quotationData, isLoading: isLoadingQuotation } =
    useGetQuotation([coinId], currencyCode);

  const formattedBalance = () => {
    if (balance) {
      return formatCryptoBalance(item.network, balance);
    }
    if (item.balance) {
      return formatCryptoBalance(item.network, item.balance);
    }
    return "0";
  };

  const loadingValue = () => {
    if (isLoadingBalance || isLoadingQuotation) {
      return <ActivityIndicator size="small" color={colors.primary} />;
    }

    const priceExists = quotationData?.[0]?.current_price;

    if (priceExists) {
      return convertCryptoOrFiat({
        value: Number(formattedBalance()),
        action: EActionToConvertCryptoOrFiat.CRYPTO_TO_FIAT,
        quotation: quotationData[0].current_price,
        localeInfo: { currencyCode, languageTag: language },
      });
    }

    return `${formattedBalance()} ${symbol}`;
  };

  return (
    <View className="flex-row items-center">
      <View
        className="bg-light-card dark:bg-dark-card rounded-md w-[50px] h-[50px] items-center justify-center"
        style={Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 4.5,
          },
          android: {
            elevation: 5,
          },
        })}
      >
        <FontAwesome6
          name="wallet"
          size={24}
          color={theme === "light" ? colors.light.text : colors.dark.text}
        />
      </View>
      <View className="flex-1 pl-4 flex-row justify-between items-center">
        <View className="flex-col">
          <Text className="text-light-text dark:text-dark-text font-bold text-[16px]">
            {item.name}
          </Text>
          <Text className="text-light-text2 dark:text-dark-text2 font-normal text-[14px]">
            {formatLongString(item.address, 8)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-light-text dark:text-dark-text font-bold text-[16px]">
            {loadingValue()}
          </Text>
          <Text className="text-light-text2 dark:text-dark-text2 text-[12px] capitalize">
            {getCryptoNetwork(item.network)}
          </Text>
        </View>
      </View>
    </View>
  );
};
