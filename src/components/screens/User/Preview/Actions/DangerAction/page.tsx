"use client";

import styles from "./page.module.css";
import ModalWindow from "@/components/shared/ModalWindow/page";
import { useState } from "react";
import IAbility from "@/types/ability.type";
import DangerButton from "@/components/UI/DangerButton/page";

export default function DangerAction(props: IAbility) {
  const [visibility, setVisibility] = useState(false);

  function openWinodw() {
    setVisibility(true);
  }

  return (
    <div className={styles.dangerAction}>
      <DangerButton value={props.value} onSubmit={openWinodw} />
      <ModalWindow
        title={props.value}
        description={props.description}
        func={props.func}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </div>
  );
}
