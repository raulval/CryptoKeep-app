import {
  EActionToConvertCryptoOrFiat,
  convertCryptoOrFiat,
} from "@/common/helpers/convertCryptoOrFiat";
import { formatCryptoBalance } from "@/common/helpers/formatCryptoBalance";
import { formatLongString } from "@/common/helpers/formatLongString";
import { getCryptoCoinId } from "@/common/helpers/getCryptoCoinId";
import { getCryptoSymbol } from "@/common/helpers/getCryptoSymbol";
import useGetQuotation from "@/services/api.config.coingecko";
import { IWalletDB } from "@/services/database/wallets/useWalletsDatabase";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLanguageStore } from "@/store/languageStore";
import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, Text, View } from "react-native";

interface TransactionCardProps {
  transaction: any;
  wallet: IWalletDB;
}

export const TransactionCard = ({
  transaction,
  wallet,
}: TransactionCardProps) => {
  const { theme } = useThemeStore();
  const { currencyCode } = useCurrencyStore();
  const { language } = useLanguageStore();
  const { data: quotationData, isLoading: isLoadingQuotation } =
    useGetQuotation([getCryptoCoinId(transaction.network)], currencyCode);
  const isReceived = transaction.to === wallet.address;

  const loadingValue = () => {
    if (isLoadingQuotation) {
      return <ActivityIndicator size="small" color={colors[theme].text} />;
    }

    const priceExists = quotationData?.[0]?.current_price;

    if (priceExists) {
      return convertCryptoOrFiat({
        value: Number(
          formatCryptoBalance(transaction.network, transaction.amount)
        ),
        action: EActionToConvertCryptoOrFiat.CRYPTO_TO_FIAT,
        quotation: quotationData[0].current_price,
        localeInfo: { currencyCode, languageTag: language },
      });
    }

    return `${transaction.amount} ${getCryptoSymbol(transaction.network)}`;
  };

  return (
    <View
      className="px-3 py-[10px] flex-row rounded-[10px] bg-light-card dark:bg-dark-card justify-between"
      style={
        theme === "light" && {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4.5,
          elevation: 5,
        }
      }
    >
      <View className="gap-2 flex-row items-center justify-between">
        <View className="flex-row">
          {isReceived ? (
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors[theme].text}
            />
          ) : (
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={colors[theme].text}
            />
          )}
        </View>
        <View className="flex-col gap-2">
          <Text className="text-[1rem] font-medium text-light-text dark:text-dark-text">
            {isReceived
              ? formatLongString(transaction.from)
              : formatLongString(transaction.to)}
          </Text>
          <Text className="text-[.8rem] font-normal text-light-text dark:text-dark-text">
            {getCryptoSymbol(transaction.network)}
          </Text>
        </View>
      </View>
      <View className="flex-col items-center justify-between">
        <Text
          className="text-[1rem] font-medium"
          style={{
            color: isReceived
              ? colors[theme].transactionReceived
              : colors[theme].transactionSent,
          }}
        >
          {isReceived ? (
            <>
              {`+ `}
              {loadingValue()}
            </>
          ) : (
            <>
              {`- `}
              {loadingValue()}
            </>
          )}
        </Text>
        <Text
          className="text-[.8rem] font-normal"
          style={{
            color: isReceived
              ? colors[theme].transactionReceived
              : colors[theme].transactionSent,
          }}
        >
          {isReceived
            ? `+ ${transaction.amount} ${getCryptoSymbol(transaction.network)}`
            : `- ${transaction.amount} ${getCryptoSymbol(transaction.network)}`}
        </Text>
      </View>
    </View>
  );
};
