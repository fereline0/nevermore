"use client";

const classNames = require("classnames/bind");
import styles from "./page.module.css";
import DangerButton from "@/components/UI/DangerButton/page";
import Button from "@/components/UI/Button/page";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Section from "@/components/shared/Content/Section/page";

interface IModalWinodw {
  title: string;
  description: string;
  func: React.MouseEventHandler<HTMLButtonElement>;
  visibility: boolean;
  setVisibility: (visible: boolean) => void;
}

export default function ModalWindow(props: IModalWinodw) {
  const { t } = useTranslation();

  const cx = classNames.bind(styles);

  const className = cx({
    overlay: true,
    active: props.visibility,
  });

  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
      <Section className={styles.modalWinodw} padding="5px 10px">
        <div className={styles.title}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.solution}>
          <DangerButton
            value={props.title}
            onClick={(event) => {
              closeWindow();
              props.func(event);
            }}
          />
          <Button value={t("shared:modalWindow:cancel")} func={closeWindow} />
        </div>
      </Section>
    </div>
  );
}
