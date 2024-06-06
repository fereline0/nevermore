import { IoIosNotifications } from "react-icons/io";
import styles from "./page.module.css";

interface INotification {
  count?: number;
}

export default function Notification(props: INotification) {
  const countDisplay =
    props.count !== undefined && props.count > 9 ? "9+" : props.count;

  return (
    <div className={styles.notification}>
      <IoIosNotifications size={"1.5em"} />
      {props.count !== undefined && props.count > 0 && (
        <span className={styles.count}>{countDisplay}</span>
      )}
    </div>
  );
}
