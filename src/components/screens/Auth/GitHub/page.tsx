"use client";

import styles from "./page.module.css";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function GitHub() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div>
      <button
        className={styles.gitHub}
        onClick={() => signIn("github", { callbackUrl })}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
