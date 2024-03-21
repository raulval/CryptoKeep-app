import { ThemeEnum, useThemeStore } from "@/store/themeStore";
import { theme } from "@/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

export const HeaderHome = () => {
  const { setTheme, theme: colorTheme } = useThemeStore();
  return (
    <View className="w-full flex flex-row items-center justify-between gap-[22px] px-[24px] pt-[24px]">
      <View className="w-[70%] h-[44px] flex flex-row items-center gap-3 px-[12px] rounded-[10px] bg-light-input dark:bg-dark-input shadow">
        <FontAwesome5
          name="search"
          size={16}
          color={theme.colors.light.placeholder}
        />
        <TextInput
          placeholder="Search"
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
          color={
            colorTheme === ThemeEnum.LIGHT
              ? theme.colors.light.text
              : theme.colors.dark.text
          }
        />
      </Pressable>
      <Pressable>
        <FontAwesome5
          name="cog"
          size={24}
          color={
            colorTheme === ThemeEnum.LIGHT
              ? theme.colors.light.text
              : theme.colors.dark.text
          }
        />
      </Pressable>
    </View>
  );
};
