"use client";

import AlightItems from "@/components/shared/AlightItems/page";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaDiscord } from "react-icons/fa6";

export default function Discord() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <button
      className={styles.discord}
      onClick={() => signIn("discord", { callbackUrl })}
    >
      <AlightItems gap={7}>
        <FaDiscord fill="white" size={22} />
        <span className={styles.label}>Discord</span>
      </AlightItems>
    </button>
  );
}
