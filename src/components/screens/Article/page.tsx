"use client";

import styles from "./page.module.css";
import Main from "@/components/shared/Content/Main/page";
import Section from "@/components/shared/Content/Section/page";
import Content from "@/components/shared/Content/page";
import MemberInfo from "@/components/shared/MemberInfo/page";
import IArticle from "@/types/article.type";
import Actions from "./Actions/page";
import { formatDistance } from "date-fns";
import { currentLocale } from "@/utils/currentLocale";
import TipTap from "@/components/shared/TipTap/page";

interface Article {
  article: IArticle;
}

export default function Article(props: Article) {
  const locale = currentLocale();

  return (
    <Content>
      <Main>
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
            <MemberInfo
              member={props.article.author}
              detail={props.article.author.role.name}
            />
          </Section>
        </div>
        <TipTap readOnly={true} content={props.article.value} />
      </Main>
    </Content>
  );
}
