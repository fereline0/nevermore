import styles from "./page.module.css";
import Image from "next/image";

interface IAvatar {
  url: string;
}

export default function Avatar(props: IAvatar) {
  return (
    <div>
      <Image
        className={styles.image}
        src={props.url ? props.url : "/no-avatar.jpg"}
        width="90"
        height="90"
        alt="user avatar"
      />
    </div>
  );
}
