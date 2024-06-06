"use client";

import styles from "./page.module.css";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Discord() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <button
      className={styles.discord}
      onClick={() => signIn("discord", { callbackUrl })}
    >
      Discord
    </button>
  );
}
