"use client";

import styles from "./page.module.css";
import MemberInfo from "@/components/shared/MemberInfo/page";
import IComment from "@/types/comment.type";
import { currentLocale } from "@/utils/currentLocale";
import { formatDistance } from "date-fns";
import Section from "@/components/shared/Content/Section/page";
import MarginBottom from "@/components/shared/MarginBottom/page";

interface Comment {
  comment: IComment;
  children: React.ReactNode;
}

export default function Comment(props: Comment) {
  const locale = currentLocale();

  return (
    <Section className={styles.comment} padding="10px">
      <MarginBottom gap={5}>
        <div className={styles.aboutWriter}>
          <MemberInfo
            member={props.comment.writer}
            detail={formatDistance(props.comment.createdAt, new Date(), {
              includeSeconds: true,
              addSuffix: true,
              locale,
            })}
          />
          {props.children}
        </div>
        <div className={styles.value}>{props.comment.value}</div>
      </MarginBottom>
    </Section>
  );
}
