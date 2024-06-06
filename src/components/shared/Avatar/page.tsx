import styles from "./page.module.css";
import Image from "next/image";

interface IAvatar {
  url?: string | null;
  size: number;
}

export default function Avatar(props: IAvatar) {
  const loadingSize = props.size * 2;

  return (
    <Image
      className={styles.image}
      src={props.url ? props.url : "/no-avatar.jpg"}
      width={loadingSize}
      height={loadingSize}
      alt="user avatar"
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
      }}
    />
  );
}
