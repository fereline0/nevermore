"use client";

import styles from "./page.module.css";
import ModalWindow from "@/components/ModalWindow/page";
import { useState } from "react";
import IAbility from "@/types/ability.type";
import DangerButton from "@/components/UI/DangerButton/page";

export default function DangerAction(props: IAbility) {
  const [stateVisibility, setStateVisibility] = useState(false);

  function openWinodw() {
    setStateVisibility(true);
  }

  return (
    <div className={styles.dangerAction}>
      <DangerButton value={props.value} func={openWinodw} />
      <ModalWindow
        title={props.value}
        description={props.description}
        func={props.func}
        getVisibility={stateVisibility}
        setVisibility={setStateVisibility}
      />
    </div>
  );
}
