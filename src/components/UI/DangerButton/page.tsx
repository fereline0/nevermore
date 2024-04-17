import styles from "./page.module.css";

export default function DangerButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button className={styles.dangerButton} {...props}>
      {props.value}
    </button>
  );
}
