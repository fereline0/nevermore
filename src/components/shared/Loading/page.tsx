import styles from "./page.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <svg className={styles.spinner} viewBox="0 0 50 50">
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        />
      </svg>
    </div>
  );
}
