import styles from "./page.module.css";

interface IRow {
  label: string;
  value: string;
}

export default function Row(props: IRow) {
  return (
    <div className={styles.row}>
      <div className={styles.label}>{props.label}:</div>
      <div className={styles.value}>{props.value}</div>
    </div>
  );
}
