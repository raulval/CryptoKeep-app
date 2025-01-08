import {
  convertCryptoOrFiat,
  EActionToConvertCryptoOrFiat,
} from "@/common/helpers/convertCryptoOrFiat";
import { formatCryptoBalance } from "@/common/helpers/formatCryptoBalance";
import { formatLongString } from "@/common/helpers/formatLongString";
import { getCryptoCoinId } from "@/common/helpers/getCryptoCoinId";
import { getCryptoNetwork } from "@/common/helpers/getCryptoNetwork";
import { getCryptoSymbol } from "@/common/helpers/getCryptoSymbol";
import useGetQuotation from "@/services/api.config.coingecko";
import { useGetWallet } from "@/services/requests/wallets/useWallets";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLanguageStore } from "@/store/languageStore";
import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { WalletTransactions } from "@/components/WalletTransactions";

export default function WalletDetails() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation("walletDetails");
  const { theme } = useThemeStore();
  const { data: wallet, isFetching } = useGetWallet(Number(id));
  const { currencyCode } = useCurrencyStore();
  const { language } = useLanguageStore();
  const { data: quotationData, isLoading: isLoadingQuotation } =
    useGetQuotation([getCryptoCoinId(wallet?.network!)], currencyCode);
  const symbol = getCryptoSymbol(wallet?.network! ?? "");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  const loadingBalance = () => {
    if (isLoadingQuotation || !wallet) {
      return <ActivityIndicator size="small" color={colors.primary} />;
    }

    const priceExists = quotationData?.[0]?.current_price;

    if (priceExists && wallet) {
      return convertCryptoOrFiat({
        value: Number(
          formatCryptoBalance(wallet.network, wallet.balance ?? "0")
        ),
        action: EActionToConvertCryptoOrFiat.CRYPTO_TO_FIAT,
        quotation: quotationData[0].current_price,
        localeInfo: { currencyCode, languageTag: language },
      });
    }

    return `-- ${symbol}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
      {isFetching ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View className="flex-1 pt-[24px]">
          {wallet ? (
            <>
              <View className="flex-row px-[20px] items-center gap-5">
                <MaterialIcons
                  name="arrow-back"
                  size={32}
                  color={colors[theme].text}
                  onPress={() => router.back()}
                />
                <Text className="text-[1.875rem] font-semibold text-light-text dark:text-dark-text">
                  {wallet.name}
                </Text>
                <MaterialIcons
                  name="edit"
                  size={24}
                  color={colors[theme].text}
                />
              </View>
              <View className="mt-[24px] gap-3">
                <Text className="text-[1.125rem] text-center text-light-text dark:text-dark-text capitalize">
                  {getCryptoNetwork(wallet.network)} Network
                </Text>
                <Text className="text-[2rem] font-semibold text-center text-light-text dark:text-dark-text">
                  {loadingBalance()}
                </Text>
                <Text className="text-[1.125rem] text-center text-light-text dark:text-dark-text">
                  {formatCryptoBalance(wallet.network, wallet.balance ?? "0")}{" "}
                  {symbol}
                </Text>
                <View className="flex-row items-center justify-center gap-4">
                  <Text className="text-[1.125rem] text-center text-light-text2 dark:text-dark-text2">
                    {formatLongString(wallet.address, 11)}
                  </Text>
                  <MaterialIcons
                    name={isCopied ? "check" : "content-copy"}
                    size={18}
                    color={isCopied ? colors.primary : colors[theme].text2}
                    onPress={async () => {
                      await Clipboard.setStringAsync(wallet.address).then(
                        () => {
                          setIsCopied(true);
                        }
                      );
                    }}
                  />
                </View>
              </View>
              <View className="mt-10">
                <Text className="text-[1.5rem] px-[24px] font-medium text-light-text dark:text-dark-text">
                  {t("Transactions")}
                </Text>
                <View className="mt-6">
                  <WalletTransactions wallet={wallet} />
                </View>
              </View>
            </>
          ) : (
            <View className="flex-1">
              <MaterialIcons
                name="arrow-back"
                size={32}
                color={colors[theme].text}
                onPress={() => router.back()}
              />

              <View className="flex-1 items-center mt-10">
                <Text className="text-[1.5rem] text-center font-semibold text-light-text2 dark:text-dark-text2">
                  {t("Something went wrong")}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
