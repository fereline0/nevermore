"use client";

import Pagination from "@/components/shared/Pagination/page";
import IPagination from "@/types/pagination.type";
import IComment from "@/types/comment.type";
import Comment from "@/components/shared/Comment/page";
import Actions from "./Actions/page";
import TextArea from "@/components/UI/TextArea/page";
import { useSession } from "next-auth/react";
import { createUserComment } from "@/services/userComment";
import { useRouter } from "next/navigation";
import Form from "@/components/shared/Form/page";
import { useTranslation } from "react-i18next";
import MarginBottom from "@/components/shared/MarginBottom/page";
import { FormEvent } from "react";

interface IComments extends IPagination {
  userId: number;
  parentId?: number;
  comments: IComment[];
}

export default function Comments(props: IComments) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    status === "authenticated" &&
      (await createUserComment(
        event,
        props.userId,
        session.user.id,
        props.parentId
      ));
    router.refresh();
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
                <Actions comment={comment} />
              </Comment>
            );
          })}
        </MarginBottom>
        <Pagination
          total={props.total}
          limit={props.limit}
          pastPagesCount={props.pastPagesCount}
          futurePagesCount={props.futurePagesCount}
        />
      </MarginBottom>
    </div>
  );
}
