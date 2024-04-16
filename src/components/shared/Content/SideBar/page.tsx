import styles from "./page.module.css";
import MarginBottom from "@/components/shared/MarginBottom/page";

interface ISideBar {
  children: React.ReactNode;
}

export default function SideBar(props: ISideBar) {
  return (
    <div className={styles.sideBar}>
      <MarginBottom gap={10}>{props.children}</MarginBottom>
    </div>
  );
}
