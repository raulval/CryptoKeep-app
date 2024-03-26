import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import enUSA from "./en/en-USA.json";
import ptBR from "./pt/pt-BR.json";

export const defaultNS = "translation";
export const resources = {
  en: {
    translation: enUSA,
  },
  "pt-BR": {
    translation: ptBR,
  },
} as const;

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (callback: (lng: string) => void) => {
    const { languageTag, languageCode } = getLocales()[0];

    if (languageTag === "pt-BR") {
      callback(languageTag);
    } else {
      callback(languageCode!);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    defaultNS,
    resources,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
