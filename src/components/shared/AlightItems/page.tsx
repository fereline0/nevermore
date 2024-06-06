import React from "react";
import styles from "./page.module.css";

interface IAlightItems {
  gap: number;
  children: React.ReactNode;
}

export default function AlightItems(props: IAlightItems) {
  return (
    <div
      className={styles.alightItems}
      style={{
        gap: props.gap,
      }}
    >
      {props.children}
    </div>
  );
}
