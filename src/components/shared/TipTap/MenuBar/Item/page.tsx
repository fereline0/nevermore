import styles from "./page.module.css";
import classNames from "classnames/bind";

interface Item {
  title: string;
  action: React.MouseEventHandler<HTMLButtonElement>;
  isActive: boolean;
  children: React.ReactNode;
}

export default function Item(props: Item) {
  const cx = classNames.bind(styles);

  const className = cx({
    item: true,
    active: props.isActive,
  });

  return (
    <button className={className} title={props.title} onClick={props.action}>
      {props.children}
    </button>
  );
}
