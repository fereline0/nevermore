import { IRow } from "@/types/row.type";
import styles from "./page.module.css";
import Link from "next/link";

export default function Row(props: IRow) {
  return (
    <div className={styles.row}>
      <div className={styles.label}>{props.label}:</div>
      <div className={styles.value}>
        {props.link ? (
          <Link href={props.link}>{props.value}</Link>
        ) : (
          props.value
        )}
      </div>
    </div>
  );
}
