"use client";

import styles from "./page.module.css";
import Pagination from "@/components/shared/Pagination/page";
import IPagination from "@/types/pagination.type";
import IComment from "@/types/comment.type";
import Comment from "@/components/shared/Comment/page";
import Actions from "./Actions/page";
import TextArea from "@/components/UI/TextArea/page";
import { useSession } from "next-auth/react";
import Form from "@/components/shared/Form/page";
import { useTranslation } from "react-i18next";
import MarginBottom from "@/components/shared/MarginBottom/page";
import { FormEvent } from "react";
import EmptyList from "@/components/shared/EmptyList/page";
import { useRouter } from "next/navigation";
import FitContent from "@/components/shared/FitContent/page";
import Button from "@/components/UI/Button/page";
import { createArticleComment } from "@/services/articleComment";
import IArticle from "@/types/article.type";

interface IComments extends IPagination {
  article: IArticle;
  writerId?: number;
  parentId?: number;
  comments: IComment[];
}

export default function Comments(props: IComments) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (status === "authenticated") {
      await createArticleComment(
        event,
        props.article.id,
        session.user.id,
        props.parentId
      );
      router.refresh();
    }
  };

  return (
    <MarginBottom gap={10}>
      {status == "authenticated" && (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <TextArea name="comment" />
          <FitContent>
            <Button type="submit" value={t("screens:comments:submitValue")} />
          </FitContent>
        </Form>
      )}
      {props.comments.length > 0 ? (
        <MarginBottom gap={10}>
          {props.comments.map((comment: IComment) => {
            return (
              <Comment key={comment.id} comment={comment}>
                <Actions
                  comment={comment}
                  supervisors={props.article.category.supervisors}
                />
              </Comment>
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
