import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Keyboard, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface SelectInputProps<T> {
  placeholder?: string;
  label?: string;
  value?: T;
  onValueChange: (value: T) => void;
  items: {
    title: string;
    value: T;
  }[];
}

export const SelectInput = <T,>({
  value,
  label,
  placeholder,
  onValueChange,
  items,
  ...rest
}: SelectInputProps<T>) => {
  const { theme } = useThemeStore();

  return (
    <View className="w-full flex-col">
      {label && (
        <Text className="text-[14px] font-medium text-light-text dark:text-dark-text mb-3">
          {label}
        </Text>
      )}
      <SelectDropdown
        data={items}
        onSelect={(selectedItem, index) => {
          Keyboard.dismiss();
          onValueChange(selectedItem.value as T);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              className={`w-full h-[52px] bg-light-input dark:bg-dark-input ${
                theme === "dark" ? "border border-dark-border" : ""
              } rounded-[16px] flex-row items-center justify-between px-[16px] text-[14px] font-normal text-light-text dark:text-dark-text`}
              style={
                theme === "light" && {
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 4.5,
                }
              }
            >
              <Text
                className={`text-[16px] font-normal ${
                  selectedItem
                    ? "text-light-text dark:text-dark-text"
                    : "text-light-placeholder dark:text-dark-placeholder"
                }`}
              >
                {selectedItem?.title ?? placeholder ?? ""}
              </Text>
              <FontAwesome5
                name={isOpened ? "chevron-up" : "chevron-down"}
                size={16}
                color={colors[theme].text}
              />
            </View>
          );
        }}
        renderItem={(item) => {
          return (
            <View className="flex-col items-center py-2">
              <Text className="text-[16px] font-normal text-light-text dark:text-dark-text">
                {item.title}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={{
          backgroundColor:
            theme === "light" ? colors.light.card : colors.dark.card,
          borderRadius: 16,
          padding: 16,
        }}
        {...rest}
      />
    </View>
  );
};
