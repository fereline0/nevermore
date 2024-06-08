import AlightItems from "@/components/shared/AlightItems/page";
import styles from "./page.module.css";
import classNames from "classnames/bind";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface IButton {
  func: React.MouseEventHandler<HTMLButtonElement>;
  visibility: boolean;
  right?: boolean;
}

export default function Button(props: IButton) {
  const cx = classNames.bind(styles);

  const className = cx({
    button: true,
    right: props.right,
    active: props.visibility,
  });

  return (
    <button className={className} onClick={props.func}>
      <AlightItems>
        {props.right ? <FaAngleRight /> : <FaAngleLeft />}
      </AlightItems>
    </button>
  );
}
