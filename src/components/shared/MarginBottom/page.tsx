import React from "react";
import styles from "./page.module.css";

interface IMarginBottom {
  gap: number;
  children: React.ReactNode;
}

export default function MarginBottom(props: IMarginBottom) {
  return (
    <div className={styles.marginBottom}>
      {React.Children.map(props.children, (child, index) => (
        <div
          style={{
            marginBottom:
              index !== React.Children.count(props.children) - 1
                ? `${props.gap}px`
                : "0",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
