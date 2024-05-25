"use client";

import AlertSection from "@/components/shared/Content/AlertSection/page";
import { useTranslation } from "react-i18next";

export default function notFound() {
  const { t } = useTranslation();

  return (
    <AlertSection padding="5px 10px">
      <p>{t("app:not-found")}</p>
    </AlertSection>
  );
}
