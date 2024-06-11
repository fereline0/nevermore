"use client";

import MarginBottom from "@/components/shared/MarginBottom/page";
import styles from "./page.module.css";
import Section from "@/components/shared/Content/Section/page";
import { formatDistance } from "date-fns";
import { currentLocale } from "@/utils/currentLocale";
import Link from "next/link";
import { IArticleComment } from "@/types/articleComment";
import { useTranslation } from "react-i18next";

interface IThread {
  comment: IArticleComment;
  children: React.ReactNode;
}

export default function Thread(props: IThread) {
  const locale = currentLocale();
  const { t } = useTranslation();

  return (
    <Section padding="10px 10px">
      <MarginBottom gap={5}>
        <div className={styles.heading}>
          <div className={styles.information}>
            <p>
              {props.comment.parentId ? (
                <>
                  {t("screens:user:selfArticleComments:replyToComment") + " "}
                  <Link href={`/users/${props.comment.parent.writer.id}`}>
                    {props.comment.parent.writer.name}
                  </Link>
                  {" " + t("screens:user:selfArticleComments:toArticle") + " "}
                  <Link href={`/articles/${props.comment.article.id}`}>
                    {props.comment.article.title}
                  </Link>
                </>
              ) : (
                <>
                  {t("screens:user:selfArticleComments:comment") +
                    " " +
                    t("screens:user:selfArticleComments:toArticle") +
                    " "}
                  <Link href={`/articles/${props.comment.article.id}`}>
                    {props.comment.article.title}
                  </Link>
                </>
              )}
            </p>
            <p>
              {formatDistance(props.comment.createdAt, new Date(), {
                includeSeconds: true,
                addSuffix: true,
                locale,
              })}
            </p>
          </div>
          {props.children}
        </div>
        <div className={styles.value}>{props.comment.value}</div>
      </MarginBottom>
    </Section>
  );
}
