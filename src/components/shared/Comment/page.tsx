"use client";

import styles from "./page.module.css";
import MemberInfo from "@/components/shared/MemberInfo/page";
import IComment from "@/types/comment.type";
import { currentLocale } from "@/utils/currentLocale";
import { formatDistance } from "date-fns";

interface CommentProps {
  comment: IComment;
  children: React.ReactNode;
}

export default function Comment({ comment, children }: CommentProps) {
  const locale = currentLocale();

  return (
    <div className={styles.comment}>
      <div className={styles.aboutWriter}>
        <MemberInfo
          member={comment.writer}
          detail={formatDistance(comment.createdAt, new Date(), {
            includeSeconds: true,
            addSuffix: true,
            locale,
          })}
        />
        {children}
      </div>
      <div className={styles.value}>{comment.value}</div>
    </div>
  );
}
