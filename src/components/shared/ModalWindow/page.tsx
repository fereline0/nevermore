"use client";

import classNames from "classnames/bind";
import styles from "./page.module.css";
import { useEffect } from "react";
import Section from "@/components/shared/Content/Section/page";

interface IModalWinodw {
  title: string;
  description: string;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function ModalWindow(props: IModalWinodw) {
  const cx = classNames.bind(styles);

  const className = cx({
    overlay: true,
    active: props.visibility,
  });

  useEffect(() => {
    const closeOnEscapePressed = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWindow;
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
      <Section
        className={styles.modalWinodw}
        padding="5px 10px"
        onClick={(event) => event.stopPropagation()}
      >
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        {props.children}
      </Section>
    </div>
  );
}
