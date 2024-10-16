import { Button } from "@/components/Button";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Biometrics() {
  const { t } = useTranslation("biometrics");

  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible)
      return Alert.alert(
        t("Biometrics not compatible"),
        t("Your device doesn't have a compatible biometric sensor"),
        [
          {
            text: "OK",
            onPress: () => router.replace("/home"),
            style: "default",
          },
        ]
      );
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return Alert.alert(
        t("Biometric record not found"),
        t("Please set up your biometrics record first"),
        [
          {
            text: "OK",
            style: "default",
          },
        ]
      );
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: t("Enable Biometrics"),
      cancelLabel: "Cancel",
      // disableDeviceFallback: true,
    });

    if (biometricAuth.success) {
      try {
        await AsyncStorage.setItem("@cryptokeep:biometrics", true.toString());
        router.replace("/home");
      } catch (e) {
        console.log("Error on biometric auth:", e);
      }
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 bg-light-background dark:bg-dark-background`}
    >
      <View
        className={`h-full ${
          Platform.OS === "ios" ? "pt-8" : "pt-24"
        } flex flex-col gap-[20px]`}
      >
        <Text className="text-[50px] pl-6 font-poppins-bold text-light-text dark:text-dark-text ">
          Crypto<Text className="text-primary font-poppins-bold">Keep</Text>
        </Text>
        <View className="flex items-center overflow-hidden">
          <Image
            source={require("@/assets/images/shell-lock-purple.png")}
            className="w-72 h-80"
          />
        </View>
        <Text className="text-[32px] pl-6 font-semibold text-light-text dark:text-dark-text">
          {Platform.OS === "ios"
            ? t(`Protect your wallets with FaceID`)
            : t(`Protect your wallets with biometrics`)}
        </Text>
        <Text className="text-[14px] pl-6 font-medium text-light-text dark:text-dark-text">
          {t(`Increase the security of your crypto wallets by...`)}
        </Text>
        <View className="flex-col items-center gap-6 w-full px-6 my-auto">
          <Button onPress={() => handleBiometricAuth()}>
            {Platform.OS === "ios"
              ? t(`Enable FaceID`)
              : t("Enable biometrics")}
          </Button>
          <Pressable onPress={() => router.replace("/home")}>
            <Text className="text-primary font-medium text-[16px]">
              {t(`Skip`)}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
