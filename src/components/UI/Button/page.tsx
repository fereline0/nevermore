import styles from "./page.module.css";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button className={styles.button} {...props}>
      {props.value}
    </button>
  );
}
