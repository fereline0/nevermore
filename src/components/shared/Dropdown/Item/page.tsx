import styles from "./page.module.css";

interface IItem {
  value: string;
  func: React.MouseEventHandler<HTMLDivElement>;
}

export default function Item(props: IItem) {
  return (
    <div onClick={props.func} className={styles.item}>
      {props.value}
    </div>
  );
}
