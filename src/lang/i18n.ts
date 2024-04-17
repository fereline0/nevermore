import en from "@/lang/en/global.json";
import ru from "@/lang/ru/global.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { zodI18nMap } from "zod-i18n-map";
import { z } from "zod";
import zRU from "zod-i18n-map/locales/ru/zod.json";
import zEN from "zod-i18n-map/locales/en/zod.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { ...en, zod: zEN },
    ru: { ...ru, zod: zRU },
  },
  lng: "ru",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

z.setErrorMap(zodI18nMap);

export default i18n;
