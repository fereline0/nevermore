import styles from "./page.module.css";

interface IMain {
  children: React.ReactNode;
}

export default function Main(props: IMain) {
  return <div className={styles.main}>{props.children}</div>;
}
