import React, { forwardRef } from "react";
import { Pressable, Text, View } from "react-native";
import Bottom, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { useTranslation } from "react-i18next";
import CountryFlag from "react-native-country-flag";
import { LanguageEnum, useLanguageStore } from "@/store/languageStore";

export type Props = {
  onClose: () => void;
};

export const BottomSheetSettings = forwardRef<Bottom, Props>(
  ({ onClose }, ref) => {
    const { t, i18n } = useTranslation("settings");
    const { theme: colorTheme } = useThemeStore();
    const { setLanguage } = useLanguageStore();
    const languageSwitch = (language: LanguageEnum) => {
      setLanguage(language);
      i18n.changeLanguage(language);
    };
    return (
      <Bottom
        ref={ref}
        snapPoints={[0.01, 500]}
        backgroundStyle={{
          backgroundColor: colors[colorTheme].bottomNav,
        }}
        handleComponent={() => null}
        backdropComponent={BottomSheetBackdrop}
      >
        <View className="p-8 gap-4 flex-col">
          <View className="flex-row items-center">
            <Text className="flex-1 text-light-text dark:text-dark-text font-semibold text-[24px]">
              {t("Settings")}
            </Text>

            <MaterialIcons
              name="close"
              size={24}
              color={colors.primary}
              onPress={onClose}
            />
          </View>
          <View className="mt-6 gap-4">
            <Text className="text-light-text dark:text-dark-text font-semibold text-[18px]">
              {t("Language")}
            </Text>
            <View className="gap-4">
              <View className="flex-row items-center gap-4">
                <CountryFlag isoCode="us" size={20} />
                <Pressable
                  className="flex-1 justify-between flex-row"
                  onPress={() => languageSwitch(LanguageEnum.EN)}
                >
                  <Text className="text-light-text dark:text-dark-text font-normal text-[16px]">
                    {t("English")}
                  </Text>
                  <MaterialIcons
                    name={
                      i18n.language === LanguageEnum.EN
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={24}
                    color={colors.primary}
                  />
                </Pressable>
              </View>
              <View className="flex-row items-center gap-4">
                <CountryFlag isoCode="br" size={20} />
                <Pressable
                  className="flex-1 justify-between flex-row"
                  onPress={() => languageSwitch(LanguageEnum.PT)}
                >
                  <Text className="text-light-text dark:text-dark-text font-normal text-[16px]">
                    {t("Portuguese")}
                  </Text>
                  <MaterialIcons
                    name={
                      i18n.language === LanguageEnum.PT
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={24}
                    color={colors.primary}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Bottom>
    );
  }
);
