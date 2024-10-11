import { useThemeStore } from "@/store/themeStore";
import { Platform, Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends Omit<TextInputProps, "onChange"> {
  placeholder?: string;
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
}

export const Input = ({
  placeholder,
  label,
  value,
  onValueChange,
  ...rest
}: InputProps) => {
  const { theme } = useThemeStore();
  return (
    <View className="w-full flex-col">
      {label && (
        <Text className="text-[14px] font-medium text-light-text dark:text-dark-text mb-3">
          {label}
        </Text>
      )}
      <TextInput
        placeholder={placeholder ?? ""}
        value={value}
        onChange={(e) => onValueChange(e.nativeEvent.text)}
        className={`w-full h-[52px] bg-light-input dark:bg-dark-input ${
          theme === "dark" ? "border border-dark-border" : ""
        } rounded-[16px] px-[16px] text-[14px] font-normal text-light-text dark:text-dark-text`}
        style={
          theme === "light" &&
          Platform.select({
            android: {
              elevation: 5,
            },
            ios: {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.15,
              shadowRadius: 4.5,
            },
          })
        }
        {...rest}
      />
    </View>
  );
};
