"use client";

import styles from "./page.module.css";
import ModalWindow from "@/components/shared/ModalWindow/page";
import IAbility from "@/types/ability.type";
import { useState } from "react";

export default function DangerItem(props: IAbility) {
  const [visibility, setVisibility] = useState(false);

  function openWinodw() {
    setVisibility(true);
  }

  return (
    <>
      <li onClick={openWinodw} className={styles.dangerItem}>
        {props.value}
      </li>
      <ModalWindow
        title={props.value}
        description={props.description}
        func={props.func}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </>
  );
}
