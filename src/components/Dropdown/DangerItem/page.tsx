import styles from "./page.module.css";

interface IDangerItem {
  value: string;
}

export default function DangerItem(props: IDangerItem) {
  return <li className={styles.dangerItem}>{props.value}</li>;
}
