import styles from "./page.module.css";
import Discord from "@/components/screens/Auth/Discord/page";
import GitHub from "@/components/screens/Auth/GitHub/page";
import Loading from "@/components/shared/Loading/page";
import { Suspense } from "react";

export default function signIn() {
  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.signIn}>
        <Discord />
        <GitHub />
      </div>
    </Suspense>
  );
}
