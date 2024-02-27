"use client";

const classNames = require("classnames/bind");
import styles from "./page.module.css";
import DangerButton from "@/components/UI/DangerButton/page";
import Button from "@/components/UI/Button/page";
import { useEffect } from "react";

interface IModalWinodw {
  title: string;
  description: string;
  func: React.MouseEventHandler<HTMLButtonElement>;
  getVisibility: boolean;
  setVisibility: any;
}

export default function ModalWindow(props: IModalWinodw) {
  const cx = classNames.bind(styles);

  const className = cx({
    overlay: true,
    active: props.getVisibility,
  });

  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.setVisibility(false);
      }
    };
    window.addEventListener("keydown", closeOnEscapePressed);
    return () => window.removeEventListener("keydown", closeOnEscapePressed);
  }, []);

  function closeWindow() {
    props.setVisibility(false);
  }

  return (
    <div className={className} onClick={closeWindow}>
      <div
        className={styles.modalWinodw}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.title}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.solution}>
          <DangerButton
            value={props.title}
            func={(event) => {
              props.func(event);
              closeWindow;
            }}
          />
          <Button value="Cancel" func={closeWindow} />
        </div>
      </div>
    </div>
  );
}
