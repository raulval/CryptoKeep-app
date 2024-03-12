import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
      <View className="pt-6 pl-6 flex flex-col gap-[24px]">
        <Text className="text-[50px] font-bold text-light-text dark:text-dark-text ">
          Crypto<Text className="text-primary">Keep</Text>
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
        <View className="w-full pr-6">
          <Pressable className="w-full h-[52px] bg-primary rounded-[16px] flex items-center justify-center">
            <Text className="font-[16px] font-medium text-center text-dark-text">
              Get Started
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
