import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  classes?: string;
  textSize?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  classes,
  textSize,
  ...rest
}) => {
  return (
    <Pressable
      className={`w-full h-[52px] bg-primary rounded-[16px] flex items-center justify-center ${
        classes ?? ""
      }`}
      {...rest}
    >
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
