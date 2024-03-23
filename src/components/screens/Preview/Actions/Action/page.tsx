"use client";

import styles from "./page.module.css";
import Button from "@/components/UI/Button/page";
import ModalWindow from "@/components/shared/ModalWindow/page";
import { useState } from "react";
import IAbility from "@/types/ability.type";

export default function Actions(props: IAbility) {
  const [visibility, setVisibility] = useState(false);

  function openWinodw() {
    setVisibility(true);
  }

  return (
    <div className={styles.action}>
      <Button value={props.value} func={openWinodw} />
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
