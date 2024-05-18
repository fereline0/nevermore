import React, { HTMLAttributes } from "react";
import styles from "./page.module.css";

interface IAlertSection extends HTMLAttributes<HTMLDivElement> {
  padding: string;
  children: React.ReactNode;
}

export default function AlertSection(props: IAlertSection) {
  const { padding, children, className, ...rest } = props;

  return (
    <div
      style={{
        padding,
      }}
      className={`${styles.alertSection} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
