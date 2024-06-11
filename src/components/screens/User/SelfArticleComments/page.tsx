"use client";

import MarginBottom from "@/components/shared/MarginBottom/page";
import Actions from "@/components/screens/Article/Comments/Actions/page";
import EmptyList from "@/components/shared/EmptyList/page";
import { useTranslation } from "react-i18next";
import Pagination from "@/components/shared/Pagination/page";
import IPagination from "@/types/pagination.type";
import Thread from "./Thread/page";
import { IArticleComment } from "@/types/articleComment";

interface ISelfArticleComments extends IPagination {
  comments: IArticleComment[];
}

export default function SelfArticleComments(props: ISelfArticleComments) {
  const { t } = useTranslation();

  return (
    <MarginBottom gap={10}>
      {props.comments.length > 0 ? (
        <MarginBottom gap={10}>
          {props.comments.map((comment: IArticleComment) => {
            return (
              <Thread comment={comment}>
                <Actions
                  comment={comment}
                  supervisors={comment.article.category.supervisors}
                />
              </Thread>
            );
          })}
        </MarginBottom>
      ) : (
        <EmptyList value={t("screens:comments:emptyList")} />
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
