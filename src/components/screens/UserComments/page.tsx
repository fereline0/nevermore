"use client";

import Pagination from "@/components/shared/Pagination/page";
import styles from "./page.module.css";
import IPagination from "@/types/pagination.type";
import IComment from "@/types/comment.type";
import Comment from "@/components/shared/Comment/page";
import Actions from "./Actions/page";
import TextArea from "@/components/UI/TextArea/page";
import { useSession } from "next-auth/react";
import { createUserComment } from "@/services/userComment";
import { useRouter } from "next/navigation";
import Form from "@/components/shared/Form/page";

interface IUserComments extends IPagination {
  userId: number;
  comments: IComment[];
}

export default function UserComments(props: IUserComments) {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className={styles.comments}>
      {status === "authenticated" && (
        <div>
          <Form
            onSubmit={(event) =>
              createUserComment(event, props.userId, session.user.id).then(
                router.refresh
              )
            }
            submitValue="Publish"
          >
            <TextArea name="comment" />
          </Form>
        </div>
      )}
      <div className={styles.commentsList}>
        {props.comments.map((comment: IComment) => {
          return (
            <Comment comment={comment}>
              <Actions comment={comment} />
            </Comment>
          );
        })}
      </div>
      <Pagination
        total={props.total}
        limit={props.limit}
        pastPagesCount={props.pastPagesCount}
        futurePagesCount={props.futurePagesCount}
      />
    </div>
  );
}
