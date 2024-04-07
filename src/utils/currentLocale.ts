import { useTranslation } from "react-i18next";
import { ru, enUS } from "date-fns/locale";

export function currentLocale() {
  const { i18n } = useTranslation();

  return i18n.language === "ru" ? ru : enUS;
}
