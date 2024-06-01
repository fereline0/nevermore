"use client";

import styles from "./page.module.css";
import ModalWindow from "@/components/shared/ModalWindow/page";
import { useState } from "react";
import IAbility from "@/types/ability.type";
import DangerButton from "@/components/UI/DangerButton/page";
import Button from "@/components/UI/Button/page";
import { useTranslation } from "react-i18next";

export default function DangerAction(props: IAbility) {
  const [visibility, setVisibility] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={styles.dangerAction}>
      <DangerButton value={props.value} onClick={() => setVisibility(true)} />
      <ModalWindow
        title={props.value}
        description={props.description}
        visibility={visibility}
        setVisibility={setVisibility}
      >
        <div className={styles.solution}>
          <DangerButton
            value={props.value}
            onClick={(event) => {
              setVisibility(false);
              props.func(event);
            }}
          />
          <Button
            value={t("shared:modalWindow:cancel")}
            onClick={() => setVisibility(false)}
          />
        </div>
      </ModalWindow>
    </div>
  );
}
