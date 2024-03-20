import { Text, View, SafeAreaView } from "react-native";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background flex items-center justify-center">
      <Text className="text-[32px] font-bold text-light-text dark:text-dark-text">
        Home
      </Text>
    </SafeAreaView>
  );
}
