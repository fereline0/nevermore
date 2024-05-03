import React from "react";
import styles from "./page.module.css";

interface ISelect extends React.InputHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export default function Select(props: ISelect) {
  return (
    <select className={styles.select} {...props}>
      {props.children}
    </select>
  );
}
