"use client";

import styles from "./page.module.css";
import Member from "@/components/shared/Member/page";
import IComment from "@/types/comment.type";
import { formatDistance } from "date-fns";

interface Comment {
  comment: IComment;
  children: React.ReactNode;
}

export default function Comment(props: Comment) {
  return (
    <div className={styles.comment}>
      <div className={styles.aboutWriter}>
        <Member
          member={props.comment.writer}
          detail={formatDistance(props.comment.createdAt, new Date(), {
            includeSeconds: true,
            addSuffix: true,
          })}
        />
        {props.children}
      </div>
      <div className={styles.value}>{props.comment.value}</div>
    </div>
  );
}
