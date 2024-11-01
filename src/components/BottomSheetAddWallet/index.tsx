import React, { forwardRef } from "react";
import { Alert, Keyboard, Pressable, Text, View } from "react-native";
import Bottom, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useThemeStore } from "@/store/themeStore";
import { colors } from "@/theme/colors";
import { useTranslation } from "react-i18next";
import { Input } from "../Input";
import { Button } from "../Button";
import { SelectInput } from "../SelectInput";
import { networks } from "@/common/constants/networks";
import { Network } from "alchemy-sdk";
import { useWallets } from "@/services/requests/wallets/useWallets";

export type Props = {
  onClose: () => void;
};

export const BottomSheetAddWallet = forwardRef<Bottom, Props>(
  ({ onClose }, ref) => {
    const { t } = useTranslation("home");
    const { theme: colorTheme } = useThemeStore();
    const [walletName, setWalletName] = React.useState("");
    const [walletAddress, setWalletAddress] = React.useState("");
    const [walletNetwork, setWalletNetwork] = React.useState<Network | null>(
      null
    );
    const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);
    const { addWallet, isPendingAddWallet } = useWallets();

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

    const handleSaveWallet = () => {
      if (!walletNetwork || !walletName || !walletAddress) return;

      addWallet(
        {
          name: walletName,
          address: walletAddress,
          network: walletNetwork,
        },
        {
          onSuccess: () => {
            Keyboard.dismiss();
            onClose();
            setWalletName("");
            setWalletAddress("");
            setWalletNetwork(null);
          },
          onError: (error) => {
            Alert.alert(t("Error"), t("Error adding wallet"));
          },
        }
      );
    };

    return (
      <Bottom
        ref={ref}
        snapPoints={isKeyboardVisible ? [0.01, "85%"] : [0.01, "65%"]}
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
          <SelectInput
            label={t("Wallet network")}
            placeholder={t("Select your wallet network")}
            value={walletNetwork}
            onValueChange={setWalletNetwork}
            items={networks}
          />
          <Button
            onPress={handleSaveWallet}
            classes={`my-auto h-[56px]`}
            disabled={
              !walletName ||
              !walletAddress ||
              !walletNetwork ||
              isPendingAddWallet
            }
          >
            {t("Save wallet")}
          </Button>
        </Pressable>
      </Bottom>
    );
  }
);
