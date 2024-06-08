"use client";

import Member from "@/components/shared/Member/page";
import styles from "./page.module.css";
import Link from "next/link";
import Separator from "@/components/shared/TextSeparator/page";
import IArticle from "@/types/article.type";
import { formatDistance } from "date-fns";
import { currentLocale } from "@/utils/currentLocale";
import Section from "@/components/shared/Content/Section/page";

interface Article {
  article: IArticle;
}

export default function Article(props: Article) {
  const locale = currentLocale();

  return (
    <Section className={styles.article} padding="10px">
      <div className={styles.aboutArticle}>
        <Link href={`/articles/${props.article.id}`} className={styles.title}>
          {props.article.title}
        </Link>
        <div>
          <Link href={`/users/${props.article.author.id}`}>
            {props.article.author.name}
          </Link>
          {props.article.category && (
            <>
              <Separator />
              <Link href={`/forums/${props.article.category.id}`}>
                {props.article.category.name}
              </Link>
            </>
          )}
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
        <Member
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
    </Section>
  );
}
