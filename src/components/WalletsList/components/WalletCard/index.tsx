import {
  convertCryptoOrFiat,
  EActionToConvertCryptoOrFiat,
} from "@/common/helpers/convertCryptoOrFiat";
import { formatLongString } from "@/common/helpers/formatLongString";
import { IWallet } from "@/interfaces/wallets";
import useGetQuotation from "@/services/api.config.coingecko";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLanguageStore } from "@/store/languageStore";
import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { ActivityIndicator, Platform, Text, View } from "react-native";

export const WalletCard = ({ item }: { item: IWallet }) => {
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
          name="coins"
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
        <Text className="text-light-text dark:text-dark-text font-bold text-[16px]">
          {loadingValue()}
        </Text>
      </View>
    </View>
  );
};
