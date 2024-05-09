import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootRoutes() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <BottomSheetModalProvider>
        <StatusBar style="auto" />
        <Slot />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
