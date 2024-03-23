import styles from "./page.module.css";

interface IFitContent {
  children: React.ReactNode;
}

export default function FitContent(props: IFitContent) {
  return <div className={styles.fitContent}>{props.children}</div>;
}
