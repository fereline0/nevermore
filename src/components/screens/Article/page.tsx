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

interface Article {
  article: IArticle;
}

export default function Article(props: Article) {
  const locale = currentLocale();

  return (
    <Content>
      <Main>
        <Section padding="5px 10px" className={styles.heading}>
          <div className={styles.title}>
            <div>
              <h2>{props.article.title}</h2>
              <p>
                {formatDistance(props.article.createdAt, new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                  locale,
                })}
              </p>
            </div>
            <Actions article={props.article} />
          </div>
          <MemberInfo
            member={props.article.author}
            detail={props.article.author.role.name}
          />
        </Section>
        <Section
          className="tiptap"
          padding="10px 10px"
          dangerouslySetInnerHTML={{ __html: props.article.value }}
        />
      </Main>
    </Content>
  );
}
