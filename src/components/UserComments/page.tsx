import Pagination from "@/components/Pagination/page";
import styles from "./page.module.css";
import IPagination from "@/types/pagination.type";
import IComment from "@/types/comment.type";
import Comment from "../Comment/page";

interface IUserComments extends IPagination {
  comments: IComment[];
}

export default function UserComments(props: IUserComments) {
  return (
    <div className={styles.comments}>
      <div className={styles.commentsList}>
        {props.comments.map((comment: IComment) => {
          return <Comment comment={comment} />;
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
