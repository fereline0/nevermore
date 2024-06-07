import React from "react";
import styles from "./page.module.css";

interface IAlightItems extends React.HTMLAttributes<HTMLDivElement> {
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
      {...props}
    >
      {props.children}
    </div>
  );
}
