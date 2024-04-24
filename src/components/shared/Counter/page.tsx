import styles from "./page.module.css";

interface ICounter {
  children: React.ReactNode;
  count: number;
}

export default function Counter(props: ICounter) {
  return (
    <div className={styles.counter}>
      {props.children}
      <span>{props.count}</span>
    </div>
  );
}
