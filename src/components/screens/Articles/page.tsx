"use client";

import IArticle from "@/types/article.type";
import Article from "@/components/shared/Article/page";
import Pagination from "@/components/shared/Pagination/page";
import IPagination from "@/types/pagination.type";
import MarginBottom from "@/components/shared/MarginBottom/page";
import EmptyList from "@/components/shared/EmptyList/page";
import { useTranslation } from "react-i18next";

interface IArticles extends IPagination {
  articles: IArticle[];
}

export default function Articles(props: IArticles) {
  const { t } = useTranslation();

  return (
    <MarginBottom gap={10}>
      {props.articles.length > 0 ? (
        <MarginBottom gap={10}>
          {props.articles.map((article: IArticle) => {
            return <Article key={article.id} article={article} />;
          })}
        </MarginBottom>
      ) : (
        <EmptyList value={t("screens:articles:emptyList")} />
      )}
      <Pagination
        total={props.total}
        limit={props.limit}
        pastPagesCount={props.pastPagesCount}
        futurePagesCount={props.futurePagesCount}
      />
    </MarginBottom>
  );
}
