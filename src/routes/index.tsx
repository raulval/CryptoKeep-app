import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootRoutes() {
  return (
    <>
      <StatusBar style="auto" />
      <Slot />
    </>
  );
}
