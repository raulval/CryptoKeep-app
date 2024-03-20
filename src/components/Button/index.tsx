import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  width,
  height,
  ...rest
}) => {
  return (
    <Pressable
      className={`${width ? `w-[${width}]` : "w-full"} ${
        height ? `h-[${height}]` : "h-[52px]"
      } bg-primary rounded-[16px] flex items-center justify-center`}
      {...rest}
    >
      <Text className="font-[16px] font-medium text-center text-dark-text">
        {children}
      </Text>
    </Pressable>
  );
};
