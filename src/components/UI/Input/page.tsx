import styles from "./page.module.css";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input className={styles.input} {...props} />;
}
