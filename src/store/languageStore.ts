import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getLocales } from "expo-localization";

export enum LanguageEnum {
  EN = "en",
  PT = "pt",
}

type LanguageData = {
  language: LanguageEnum;
};

const initialState: LanguageData = {
  language: getLocales()[0].languageCode as LanguageEnum,
};

type LanguageAction = {
  setLanguage: (language: LanguageEnum) => void;
};

export const useLanguageStore = create(
  persist<LanguageData & LanguageAction>(
    (set) => ({
      ...initialState,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
