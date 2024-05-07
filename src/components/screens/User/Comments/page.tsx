"use client";

import Pagination from "@/components/shared/Pagination/page";
import IPagination from "@/types/pagination.type";
import IComment from "@/types/comment.type";
import Comment from "@/components/shared/Comment/page";
import Actions from "./Actions/page";
import TextArea from "@/components/UI/TextArea/page";
import { useSession } from "next-auth/react";
import { createUserComment } from "@/services/userComment";
import Form from "@/components/shared/Form/page";
import { useTranslation } from "react-i18next";
import MarginBottom from "@/components/shared/MarginBottom/page";
import { FormEvent } from "react";
import EmptyList from "@/components/shared/EmptyList/page";

interface IComments extends IPagination {
  userId: number;
  writerId?: number;
  parentId?: number;
  comments: IComment[];
  refresh: () => void;
}

export default function Comments(props: IComments) {
  const { data: session, status } = useSession();

  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    status === "authenticated" &&
      (await createUserComment(
        event,
        props.userId,
        session.user.id,
        props.writerId,
        props.parentId
      ));
    props.refresh();
  };

  return (
    <MarginBottom gap={10}>
      {status == "authenticated" && (
        <Form
          onSubmit={handleSubmit}
          submitValue={t("screens:comments:publish")}
        >
          <TextArea name="comment" />
        </Form>
      )}
      {props.comments.length > 0 ? (
        <MarginBottom gap={10}>
          {props.comments.map((comment: IComment) => {
            return (
              <Comment key={comment.id} comment={comment}>
                <Actions comment={comment} refresh={props.refresh} />
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
        page={props.page}
        setPage={props.setPage}
      />
    </MarginBottom>
  );
}
