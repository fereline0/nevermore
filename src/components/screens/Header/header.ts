import { useTranslation } from "react-i18next";

interface TranslationFunction {
  (key: string): string;
}

const getMenuItems = (t: TranslationFunction) => [
  {
    name: t("screens:header:forum"),
    link: "/forums",
  },
  {
    name: t("screens:header:support"),
    link: "/support",
  },
  {
    name: t("screens:header:market"),
    link: "/market",
  },
];

export default function header() {
  const { t } = useTranslation();
  const items = getMenuItems(t);

  return items;
}
