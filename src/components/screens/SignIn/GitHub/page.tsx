"use client";

import AlightItems from "@/components/shared/AlightItems/page";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa6";

export default function GitHub() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <button
      className={styles.gitHub}
      onClick={() => signIn("github", { callbackUrl })}
    >
      <AlightItems gap={7}>
        <FaGithub fill="white" size={22} />
        <span className={styles.label}>GitHub</span>
      </AlightItems>
    </button>
  );
}
