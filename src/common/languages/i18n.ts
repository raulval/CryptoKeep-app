import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";

import enUSA from "./en/en-USA.json";
import ptBR from "./pt/pt-BR.json";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const defaultNS = "translation";
export const resources = {
  en: enUSA,
  pt: ptBR,
} as const;

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async () => {
    try {
      const languageStorage = await AsyncStorage.getItem("language-storage");
      const { language } = JSON.parse(languageStorage!).state;
      const { languageCode } = getLocales()[0];

      if (language) {
        return language;
      } else if (languageCode) {
        return languageCode;
      } else {
        return "en";
      }
    } catch (error) {
      console.log("Error in language detection:", error);
      return "en";
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    defaultNS,
    fallbackLng: "en",
    resources,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
