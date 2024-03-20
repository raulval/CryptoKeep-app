import { Text, View, SafeAreaView } from "react-native";

export default function Activity() {
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center bg-light-background dark:bg-dark-background">
      <Text className="text-3xl text-light-text dark:text-dark-text">
        Activity
      </Text>
    </SafeAreaView>
  );
}
