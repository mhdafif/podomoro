import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import EnLocales from "../locales/en.json";
import IdLocales from "../locales/id.json";

i18next
  .use(initReactI18next)
  // if your apps using language default by data from API, don't need this one
  .use(LanguageDetector)
  .init({
    debug: import.meta.env.VITE_ENVIRONMENT === "local" ? true : false,
    fallbackLng: "en",
    // load: "languageOnly",
    resources: {
      en: {
        translation: EnLocales,
      },
      id: {
        translation: IdLocales,
      },
    },
  });
