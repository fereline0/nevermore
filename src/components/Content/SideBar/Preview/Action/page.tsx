"use client";

import styles from "./page.module.css";
import Button from "@/components/UI/Button/page";
import ModalWindow from "@/components/ModalWindow/page";
import { useState } from "react";
import IAbility from "@/types/ability.type";

export default function Actions(props: IAbility) {
  const [stateVisibility, setStateVisibility] = useState(false);

  function openWinodw() {
    setStateVisibility(true);
  }

  return (
    <div className={styles.action}>
      <Button value={props.name} func={openWinodw} />
      <ModalWindow
        title={props.name}
        description={props.description}
        func={props.func}
        getVisibility={stateVisibility}
        setVisibility={setStateVisibility}
      />
    </div>
  );
}
