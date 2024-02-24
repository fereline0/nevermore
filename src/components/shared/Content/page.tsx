import styles from "./page.module.css";

interface IContent {
  children: React.ReactNode;
}

export default function Content(props: IContent) {
  return <div className={styles.content}>{props.children}</div>;
}
