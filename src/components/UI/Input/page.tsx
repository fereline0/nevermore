import styles from "./page.module.css";

interface IInput {
  placeholder: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input(props: IInput) {
  return (
    <input
      className={styles.input}
      type="text"
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}
