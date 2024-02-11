const classNames = require("classnames/bind");
import styles from "./page.module.css";

interface IDropdown {
  getVisibility: boolean;
  right: boolean;
  children: React.ReactNode;
}

export default function Dropdown(props: IDropdown) {
  const cx = classNames.bind(styles);

  const className = cx({
    dropdown: true,
    left: !props.right,
    right: props.right,
    active: props.getVisibility,
  });

  return <ul className={className}>{props.children}</ul>;
}
