"use client";

import MemberInfo from "@/components/shared/MemberInfo/page";
import styles from "./page.module.css";
import Link from "next/link";
import Separator from "@/components/screens/Forums/Articles/Separator/page";
import IArticle from "@/types/article.type";
import { formatDistance } from "date-fns";
import { currentLocale } from "@/utils/currentLocale";

interface Article {
  article: IArticle;
}

export default function Article(props: Article) {
  const locale = currentLocale();

  return (
    <div className={styles.article}>
      <div className={styles.aboutArticle}>
        <a href="" className={styles.title}>
          {props.article.title}
        </a>
        <div>
          <Link href={`/users/${props.article.author.id}`}>
            {props.article.author.name}
          </Link>
          <Separator />
          <span>
            {formatDistance(props.article.createdAt, new Date(), {
              includeSeconds: true,
              addSuffix: true,
              locale,
            })}
          </span>
        </div>
      </div>
      <div className={styles.aboutLastWriter}>
        <MemberInfo
          member={
            props.article.comments[0]
              ? props.article.comments[0].writer
              : props.article.author
          }
          detail={formatDistance(
            props.article.comments[0]
              ? props.article.comments[0].createdAt
              : props.article.createdAt,
            new Date(),
            {
              includeSeconds: true,
              addSuffix: true,
              locale,
            }
          )}
        />
      </div>
    </div>
  );
}
