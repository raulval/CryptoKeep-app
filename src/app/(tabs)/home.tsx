import { HeaderHome } from "@/components/HeaderHome";
import { MainCard } from "@/components/MainCard";
import { Platform, SafeAreaView, Text, View } from "react-native";

export default function Home() {
  return (
    <SafeAreaView
      className="flex-1 bg-light-background dark:bg-dark-background"
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : 36,
      }}
    >
      <View className="gap-[32px]">
        <HeaderHome />
        <MainCard />
      </View>
    </SafeAreaView>
  );
}
