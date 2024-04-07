import { useTranslation } from "react-i18next";

interface TranslationFunction {
  (key: string): string;
}

const getMenuItems = (t: TranslationFunction) => [
  {
    name: t("screens:users:edit:general"),
    link: "general",
  },
  {
    name: t("screens:users:edit:security"),
    link: "security",
  },
  {
    name: t("screens:users:edit:detailInformation"),
    link: "detailInformation",
  },
];

export default function edit() {
  const { t } = useTranslation();
  const items = getMenuItems(t);

  return items;
}
