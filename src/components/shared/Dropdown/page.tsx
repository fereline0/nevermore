import classNames from "classnames/bind";
import { useEffect } from "react";
import styles from "./page.module.css";

interface IDropdown {
  visibility: boolean;
  setVisibility: (visible: boolean) => void;
  right: boolean;
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement>;
}

export default function Dropdown(props: IDropdown) {
  const cx = classNames.bind(styles);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      props.parentRef.current &&
      !props.parentRef.current.contains(event.target as Node)
    ) {
      props.setVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.parentRef]);

  const className = cx({
    dropdown: true,
    right: props.right,
    active: props.visibility,
  });

  return <div className={className}>{props.children}</div>;
}
