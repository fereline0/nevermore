import styles from "./page.module.css";
import Discord from "@/components/screens/Auth/Discord/page";
import GitHub from "@/components/screens/Auth/GitHub/page";

export default function signIn() {
  return (
    <div className={styles.signIn}>
      <Discord />
      <GitHub />
    </div>
  );
}
