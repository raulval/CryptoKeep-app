import { Button } from "@/components/Button";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, SafeAreaView, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { initWalletsDatabase } from "@/services/database/wallets";
import { initPortfolioDatabase } from "@/services/database/portfolio";

const walletsDB = openDatabaseSync("wallets.db");
const db = drizzle(walletsDB, { logger: true });

export default function Onboarding() {
  const { t } = useTranslation("onboarding");
  const { t: tBiometrics } = useTranslation("biometrics");

  // BUG: lib is not working
  // @ts-ignore
  useDrizzleStudio(db);

  const handleBiometricAuth = useCallback(async () => {
    try {
      const [hasOnboarded, hasBiometrics] = await Promise.all([
        AsyncStorage.getItem("@cryptokeep:onboarding"),
        AsyncStorage.getItem("@cryptokeep:biometrics"),
      ]);

      if (!hasOnboarded) return;
      if (hasOnboarded && !hasBiometrics) return router.replace("/home");

      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: tBiometrics("Access wallets"),
        cancelLabel: tBiometrics("Cancel"),
      });

      if (biometricAuth.success) {
        router.replace("/home");
      }
    } catch (error) {
      console.error("Biometric Authentication Error:", error);
    }
  }, [router]);

  useEffect(() => {
    handleBiometricAuth();
  }, [handleBiometricAuth]);

  const handleGetStarted = useCallback(async () => {
    try {
      await AsyncStorage.setItem("@cryptokeep:onboarding", "true");
      router.push("/biometrics");
    } catch (error) {
      console.error("Error during onboarding:", error);
    }
  }, [router]);

  useEffect(() => {
    initWalletsDatabase()
      .then(() => console.log("Wallets Database initialized"))
      .catch((error) =>
        console.error("Wallets Database initialization failed:", error)
      );
    initPortfolioDatabase()
      .then(() => console.log("Portfolio Database initialized"))
      .catch((error) =>
        console.error("Portfolio Database initialization failed:", error)
      );
  }, []);

  return (
    <SafeAreaView
      className={`flex-1 bg-light-background dark:bg-dark-background`}
    >
      <View
        className={`h-full ${
          Platform.OS === "ios" ? "pt-8" : "pt-24"
        } pl-6 flex flex-col gap-[24px]`}
      >
        <Text className="text-[50px] font-poppins-bold text-light-text dark:text-dark-text ">
          Crypto<Text className="text-primary font-poppins-bold">Keep</Text>
        </Text>
        <View className="flex items-end">
          <Image source={require("@/assets/images/onboardingImg.png")} />
        </View>
        <Text className="text-[32px] leading-[150%] font-semibold text-light-text dark:text-dark-text">
          {t(`Manage your crypto portfolio`)}
        </Text>
        <Text className="text-[14px] leading-[150%] font-medium text-light-text dark:text-dark-text">
          {t(`Take your investment portfolio to next level`)}
        </Text>
        <View className="w-full pr-6 my-auto">
          <Button onPress={handleGetStarted}>{t("Get Started")}</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
