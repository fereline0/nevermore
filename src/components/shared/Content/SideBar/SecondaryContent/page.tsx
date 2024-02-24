import styles from "./page.module.css";
import Link from "next/link";

interface ISecondaryContent {
  title: string;
  link: string;
  children: React.ReactNode;
  counter?: number;
}

export default function SecondaryContent(props: ISecondaryContent) {
  return (
    <div className={styles.secondaryContent}>
      <div className={styles.title}>
        <Link href={props.link}>
          {props.title} <span className={styles.counter}>{props.counter}</span>
        </Link>
      </div>
      {props.children}
    </div>
  );
}
