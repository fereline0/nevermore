"use client";

import styles from "./page.module.css";
import Section from "@/components/shared/Content/Section/page";
import MemberInfo from "@/components/shared/MemberInfo/page";
import TextSeparator from "@/components/shared/TextSeparator/page";
import INotification from "@/types/notification.type";
import { currentLocale } from "@/utils/currentLocale";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Notification {
  notification: INotification;
}

export default function Notification(props: Notification) {
  const locale = currentLocale();

  const { t } = useTranslation();

  return (
    <Section padding="10px 10px">
      <div className={styles.notification}>
        <div>
          <Link href={"/"}>{props.notification.value}</Link>
          <p>
            {formatDistance(props.notification.updatedAt, new Date(), {
              includeSeconds: true,
              addSuffix: true,
              locale,
            })}
            <TextSeparator />
            {props.notification.read
              ? t("screens:notifications:readStatuses:read")
              : t("screens:notifications:readStatuses:new")}
          </p>
        </div>
        <MemberInfo
          member={props.notification.writer}
          detail={props.notification.writer.role.name}
        />
      </div>
    </Section>
  );
}