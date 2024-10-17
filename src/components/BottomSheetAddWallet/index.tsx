import React, { forwardRef } from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
import Bottom, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { useTranslation } from "react-i18next";
import { Input } from "../Input";
import { Button } from "../Button";

export type Props = {
  onClose: () => void;
};

export const BottomSheetAddWallet = forwardRef<Bottom, Props>(
  ({ onClose }, ref) => {
    const { t } = useTranslation("home");
    const { theme: colorTheme } = useThemeStore();
    const [walletName, setWalletName] = React.useState("");
    const [walletAddress, setWalletAddress] = React.useState("");
    const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);

    React.useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => setIsKeyboardVisible(true)
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => setIsKeyboardVisible(false)
      );
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, [Keyboard]);

    return (
      <Bottom
        ref={ref}
        snapPoints={isKeyboardVisible ? [0.01, "80%"] : [0.01, "50%"]}
        backgroundStyle={{
          backgroundColor: colors[colorTheme].bottomSheet,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors[colorTheme].text,
        }}
        backdropComponent={BottomSheetBackdrop}
        onClose={() => {
          Keyboard.dismiss();
          onClose();
          setWalletName("");
          setWalletAddress("");
        }}
      >
        <Pressable
          className="flex-1 p-8 gap-4"
          onPress={() => Keyboard.dismiss()}
        >
          <View className="flex-row mb-4">
            <Text className="flex-1 text-light-text dark:text-dark-text font-semibold text-[20px] text-center">
              {t("Add new wallet")}
            </Text>
          </View>
          <Input
            label={t("Wallet name")}
            value={walletName}
            onValueChange={setWalletName}
          />
          <Input
            label={t("Wallet address")}
            value={walletAddress}
            onValueChange={setWalletAddress}
            autoCapitalize="none"
          />
          <Button
            onPress={() => {
              Keyboard.dismiss();
              onClose();
              setWalletName("");
              setWalletAddress("");
            }}
            classes={`mb-auto h-[56px]`}
            disabled={!walletName || !walletAddress}
          >
            {t("Save wallet")}
          </Button>
        </Pressable>
      </Bottom>
    );
  }
);
