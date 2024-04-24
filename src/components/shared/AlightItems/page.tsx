import React from "react";
import styles from "./page.module.css";

interface IAlightItems {
  children: React.ReactNode;
}

export default function AlightItems(props: IAlightItems) {
  return <div className={styles.alightItems}>{props.children}</div>;
}
