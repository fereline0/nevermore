import Link from "next/link";
import styles from "./page.module.css";
import Avatar from "./Avatar/page";
import IUser from "@/types/user.type";
import { BiCommentDetail } from "react-icons/bi";
import Counter from "@/components/shared/Counter/page";

interface IMember {
  member: IUser;
  detail: string;
  children?: React.ReactNode;
}

export default function Member(props: IMember) {
  return (
    <div className={styles.member}>
      <div className={styles.info}>
        <Avatar url={props.member.image} />
        <div className={styles.about}>
          <Link href={`/users/${props.member.id}`}>{props.member.name}</Link>
          <div className={styles.detail}>
            <span>{props.detail}</span>
          </div>
          <div className={styles.counters}>
            <Counter count={props.member._count.writerComments}>
              <BiCommentDetail />
            </Counter>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
}
