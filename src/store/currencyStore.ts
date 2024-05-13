import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getLocales } from "expo-localization";

type CurrencyData = {
  currencyCode: string;
  currencySymbol: string;
};

const initialState: CurrencyData = {
  currencyCode: getLocales()[0].currencyCode || "USD",
  currencySymbol: getLocales()[0].currencySymbol || "$",
};

type CurrencyAction = {
  setCurrencyCode: (currencyCode: string) => void;
  setCurrencySymbol: (currencySymbol: string) => void;
};

export const useCurrencyStore = create(
  persist<CurrencyData & CurrencyAction>(
    (set) => ({
      ...initialState,
      setCurrencyCode: (currencyCode) => set({ currencyCode }),
      setCurrencySymbol: (currencySymbol) => set({ currencySymbol }),
    }),
    {
      name: "currency-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
