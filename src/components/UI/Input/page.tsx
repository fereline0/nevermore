import styles from "./page.module.css";

interface IInput {
  placeholder: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input(props: IInput) {
  return (
    <input
      className={styles.input}
      name={props.name}
      type="text"
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}
