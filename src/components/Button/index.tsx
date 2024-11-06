import { colors } from "@/theme/colors";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  classes?: string;
  textSize?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  classes,
  textSize,
  isLoading,
  ...rest
}) => {
  return (
    <Pressable
      className={`w-full h-[52px] bg-primary rounded-[16px] flex flex-row gap-2 items-center justify-center disabled:opacity-60 ${
        classes ?? ""
      }`}
      {...rest}
    >
      {isLoading && <ActivityIndicator size="small" color={colors.dark.text} />}
      <Text
        className={`${
          textSize ?? "text-[16px]"
        } font-medium text-center text-dark-text`}
      >
        {children}
      </Text>
    </Pressable>
  );
};
