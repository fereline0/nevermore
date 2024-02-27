import styles from "./page.module.css";

interface ITextArea {
  placeholder?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TextArea(props: ITextArea) {
  return (
    <textarea
      name={props.name}
      className={styles.textArea}
      placeholder={props.placeholder}
    />
  );
}
