import styles from "./page.module.css";
import MarginBottom from "@/components/shared/MarginBottom/page";

interface IMain {
  children: React.ReactNode;
}

export default function Main(props: IMain) {
  return (
    <div className={styles.main}>
      <MarginBottom gap={10}>{props.children}</MarginBottom>
    </div>
  );
}
