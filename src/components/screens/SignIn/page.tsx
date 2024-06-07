"use client";

import Section from "@/components/shared/Content/Section/page";
import styles from "./page.module.css";
import MarginBottom from "@/components/shared/MarginBottom/page";
import Discord from "./Discord/page";
import GitHub from "./GitHub/page";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/shared/Loading/page";

export default function SignIn() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") {
      router.push(`/users/${session.user.id}`);
    }
  }, [status, router, session]);

  if (status != "unauthenticated") {
    return <Loading />;
  }

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
