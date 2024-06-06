"use client";

import DangerButton from "@/components/UI/DangerButton/page";
import styles from "./page.module.css";
import ModalWindow from "@/components/shared/ModalWindow/page";
import IAbility from "@/types/ability.type";
import { useState } from "react";
import Button from "@/components/UI/Button/page";
import { useTranslation } from "react-i18next";

export default function DangerItem(props: IAbility) {
  const [visibility, setVisibility] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div onClick={() => setVisibility(true)} className={styles.dangerItem}>
        {props.value}
      </div>
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
    </>
  );
}
