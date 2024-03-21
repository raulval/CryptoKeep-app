import { HeaderHome } from "@/components/HeaderHome";
import { Text, View, SafeAreaView } from "react-native";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
      <View>
        <HeaderHome />
      </View>
    </SafeAreaView>
  );
}
