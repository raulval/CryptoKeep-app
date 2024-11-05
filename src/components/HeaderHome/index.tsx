import { useSearchStore } from "@/store/searchStore";
import { ThemeEnum, useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Pressable, TextInput, View } from "react-native";

interface HeaderHomeProps {
  onOpenSettingsBottomSheet?: () => void;
}

export const HeaderHome: React.FC<HeaderHomeProps> = ({
  onOpenSettingsBottomSheet,
}) => {
  const { t } = useTranslation("home");
  const { setTheme, theme: colorTheme } = useThemeStore();
  const { search, setSearch } = useSearchStore();
  return (
    <View className="w-full flex flex-row items-center justify-between gap-[22px] px-[24px] pt-[24px] mb-4 rounded-b-md">
      <View
        className="w-[70%] h-[44px] flex flex-row items-center gap-3 px-[12px] rounded-[10px] bg-light-input dark:bg-dark-input"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <FontAwesome5
          name="search"
          size={16}
          color={colors.light.placeholder}
        />
        <TextInput
          placeholder={t("Search")}
          value={search}
          onChange={(e) => setSearch(e.nativeEvent.text)}
          className="w-[95%] text-[14px] font-normal text-light-text dark:text-dark-text placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder"
        />
      </View>
      <Pressable
        onPress={() =>
          setTheme(
            colorTheme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT
          )
        }
      >
        <FontAwesome5
          name={colorTheme === ThemeEnum.LIGHT ? "moon" : "sun"}
          size={24}
          color={colors[colorTheme].text}
        />
      </Pressable>
      <Pressable onPress={onOpenSettingsBottomSheet}>
        <FontAwesome5 name="cog" size={24} color={colors[colorTheme].text} />
      </Pressable>
    </View>
  );
};
