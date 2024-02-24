import Pagination from "@/components/shared/Pagination/page";
import styles from "./page.module.css";
import IPagination from "@/types/pagination.type";
import IComment from "@/types/comment.type";
import Comment from "@/components/shared/Comment/page";
import Actions from "./Actions/page";

interface IUserComments extends IPagination {
  comments: IComment[];
}

export default function UserComments(props: IUserComments) {
  return (
    <div className={styles.comments}>
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
