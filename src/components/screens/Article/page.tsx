"use client";

import styles from "./page.module.css";
import Section from "@/components/shared/Content/Section/page";
import Member from "@/components/shared/Member/page";
import IArticle from "@/types/article.type";
import Actions from "./Actions/page";
import { formatDistance } from "date-fns";
import { currentLocale } from "@/utils/currentLocale";
import TipTap from "@/components/shared/TipTap/page";
import MarginBottom from "@/components/shared/MarginBottom/page";

interface Article {
  article: IArticle;
  children: React.ReactNode;
}

export default function Article(props: Article) {
  const locale = currentLocale();

  return (
    <MarginBottom gap={10}>
      <div className={styles.aboutArticle}>
        <Section padding="5px 10px" className={styles.general}>
          <div className={styles.title}>
            <h2>{props.article.title}</h2>
            <p>
              {formatDistance(props.article.createdAt, new Date(), {
                includeSeconds: true,
                addSuffix: true,
                locale,
              })}
            </p>
          </div>
          <div className={styles.actions}>
            <Actions article={props.article} />
          </div>
        </Section>
        <Section padding="5px 10px">
          <Member
            member={props.article.author}
            detail={props.article.author.role.name}
          />
        </Section>
      </div>
      <TipTap readOnly={true} content={props.article.value} />
      {props.children}
    </MarginBottom>
  );
}
