import { BottomSheetSettings } from "@/components/BottomSheetSettings";
import { HeaderHome } from "@/components/HeaderHome";
import { MainCard } from "@/components/MainCard";
import { useRef } from "react";
import Bottom from "@gorhom/bottom-sheet";
import { Platform, SafeAreaView, Text, View } from "react-native";

export default function Home() {
  const bottomSheetRef = useRef<Bottom>(null);
  const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
  const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);
  return (
    <SafeAreaView
      className="flex-1 bg-light-background dark:bg-dark-background"
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : 36,
      }}
    >
      <View className="gap-[32px]">
        <HeaderHome onOpenSettingsBottomSheet={handleBottomSheetOpen} />
        <MainCard />
      </View>
      <BottomSheetSettings
        ref={bottomSheetRef}
        onClose={handleBottomSheetClose}
      />
    </SafeAreaView>
  );
}
