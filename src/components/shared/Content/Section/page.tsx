import React, { HTMLAttributes } from "react";
import styles from "./page.module.css";

interface ISection extends HTMLAttributes<HTMLDivElement> {
  padding: string;
  children: React.ReactNode;
}

export default function Section(props: ISection) {
  const { padding, children, className, ...rest } = props;

  return (
    <div
      style={{
        padding,
      }}
      className={`${styles.section} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
