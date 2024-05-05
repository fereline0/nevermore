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
    <div>
      <MarginBottom gap={10}>
        <Form
          onSubmit={handleSubmit}
          submitValue={t("screens:comments:publish")}
        >
          <TextArea name="comment" />
        </Form>
        <MarginBottom gap={10}>
          {props.comments.map((comment: IComment) => {
            return (
              <Comment key={comment.id} comment={comment}>
                <Actions comment={comment} refresh={props.refresh} />
              </Comment>
            );
          })}
        </MarginBottom>
        <Pagination
          total={props.total}
          limit={props.limit}
          pastPagesCount={props.pastPagesCount}
          futurePagesCount={props.futurePagesCount}
          page={props.page}
          setPage={props.setPage}
        />
      </MarginBottom>
    </div>
  );
}
