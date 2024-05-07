import Link from "next/link";
import styles from "./page.module.css";
import Avatar from "./Avatar/page";
import IUser from "@/types/user.type";

interface IMemberInfo {
  member: IUser;
  detail: string;
  children?: React.ReactNode;
}

export default function MemberInfo(props: IMemberInfo) {
  return (
    <div className={styles.memberInfo}>
      <div className={styles.member}>
        <Avatar url={props.member.image} />
        <div className={styles.about}>
          <Link href={`/users/${props.member.id}`}>{props.member.name}</Link>
          <div className={styles.detail}>
            <span>{props.detail}</span>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
}
