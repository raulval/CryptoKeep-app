import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUSA from "./en/en-USA.json";
import ptBR from "./pt/pt-BR.json";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";

export const defaultNS = "translation";
export const resources = {
  en: enUSA,
  pt: ptBR,
} as const;

i18n
  .use(RNLanguageDetector)
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
