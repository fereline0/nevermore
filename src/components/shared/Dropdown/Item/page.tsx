import styles from "./page.module.css";

interface IItem {
  value: string;
  func: React.MouseEventHandler<HTMLLIElement>;
}

export default function Item(props: IItem) {
  return (
    <li onClick={props.func} className={styles.item}>
      {props.value}
    </li>
  );
}
