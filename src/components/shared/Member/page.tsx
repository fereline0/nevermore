import Link from "next/link";
import styles from "./page.module.css";
import IUser from "@/types/user.type";
import Avatar from "@/components/shared/Avatar/page";

interface IMember {
  member: IUser;
  detail: string;
  children?: React.ReactNode;
}

export default function Member(props: IMember) {
  return (
    <div className={styles.member}>
      <div className={styles.info}>
        <Avatar url={props.member.image} size={45} />
        <div className={styles.about}>
          <Link href={`/users/${props.member.id}`}>{props.member.name}</Link>
          <div className={styles.detail}>
            <span>{props.detail}</span>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
}
