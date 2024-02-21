import styles from "./page.module.css";
import Image from "next/image";

interface IAvatar {
  url: string;
}

export default function Avatar(props: IAvatar) {
  return (
    <div className={styles.avatar}>
      <Image
        className={styles.image}
        src={props.url ? props.url : "/no-avatar.jpg"}
        width="440"
        height="440"
        alt="user avatar"
      />
    </div>
  );
}
