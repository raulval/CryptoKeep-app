import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

type ThemeData = {
  theme: ThemeEnum;
};

type ThemeAction = {
  setTheme: (theme: ThemeEnum) => void;
};

export const useThemeStore = create(
  persist<ThemeData & ThemeAction>(
    (set) => ({
      theme: ThemeEnum.LIGHT,
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
