import styles from "./page.module.css";
import Button from "@/components/UI/Button/page";

interface IAction {
  value: string;
  func: React.MouseEventHandler<HTMLElement>;
}

export default function Actions(props: IAction) {
  return (
    <div className={styles.action}>
      <Button value={props.value} func={props.func} />
    </div>
  );
}
