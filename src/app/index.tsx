import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Image, Platform, SafeAreaView, Text, View } from "react-native";

export default function Onboarding() {
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
          Manage your crypto portfolio
        </Text>
        <Text className="text-[14px] leading-[150%] font-medium text-light-text dark:text-dark-text">
          {`Take your investment portfolio\n to next level`}
        </Text>
        <View className="w-full pr-6 my-auto">
          <Button onPress={() => router.replace("/home")}>Get Started</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
