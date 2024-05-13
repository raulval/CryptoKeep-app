import { formatValueByCurrencyCode } from "@/common/helpers/formatValueByCurrencyCode";
import { useCurrencyStore } from "@/store/currencyStore";
import { useLanguageStore } from "@/store/languageStore";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export const MainCard = () => {
  const { t } = useTranslation("home");
  const { currencyCode } = useCurrencyStore();
  const { language } = useLanguageStore();
  return (
    <View
      className="w-full px-[24px]"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <LinearGradient
        colors={["#4336a9", "#5040cb", "#6552FE"]}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.3, 0.8]}
        style={{ borderRadius: 16 }}
      >
        <View className="w-full h-[170px] px-[24px] py-[16px] flex flex-col justify-between">
          <Text className="text-[16px] font-medium text-dark-text">
            {t("Current Balance")}
          </Text>
          <Text className="text-[24px] font-poppins-bold text-dark-text">
            {formatValueByCurrencyCode({
              value: 52345.22,
              currencyCode,
              localeCode: language,
              withSymbol: true,
            })}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};
