"use client";

import Section from "@/components/shared/Content/Section/page";
import styles from "./page.module.css";
import MarginBottom from "@/components/shared/MarginBottom/page";
import Discord from "./Discord/page";
import GitHub from "./GitHub/page";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const { t } = useTranslation();

  return (
    <MarginBottom gap={5} className={styles.signIn}>
      <Section padding="5px 10px">
        <h3>{t("signIn:value")}</h3>
      </Section>
      <Section padding="10px 10px">
        <MarginBottom gap={5}>
          <Discord />
          <GitHub />
        </MarginBottom>
      </Section>
    </MarginBottom>
  );
}
