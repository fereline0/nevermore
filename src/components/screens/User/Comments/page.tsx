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

interface IComments extends IPagination {
  userId: number;
  parentId?: number;
  comments: IComment[];
}

export default function Comments(props: IComments) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <div>
      <MarginBottom gap={10}>
        {status === "authenticated" && (
          <div>
            <Form
              onSubmit={(event) =>
                createUserComment(
                  event,
                  props.userId,
                  session.user.id,
                  props.parentId
                ).then(router.refresh)
              }
              submitValue={t("screens:comments:publish")}
            >
              <TextArea name="comment" />
            </Form>
          </div>
        )}
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
