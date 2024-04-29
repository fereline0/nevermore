"use client";

import IRole from "@/types/role.type";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";

interface Role {
  role: IRole;
}

export default function Role(props: Role) {
  const { t } = useTranslation();

  return (
    <h3
      className={styles.role}
      style={{
        backgroundColor: `#${props.role.color}`,
      }}
    >
      {t(props.role.name)}
    </h3>
  );
}
