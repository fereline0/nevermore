import styles from "./page.module.css";
import ModalWindow from "@/components/shared/ModalWindow/page";
import IAbility from "@/types/ability.type";
import { useState } from "react";

export default function DangerItem(props: IAbility) {
  const [stateVisibility, setStateVisibility] = useState(false);

  function openWinodw() {
    setStateVisibility(true);
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
        getVisibility={stateVisibility}
        setVisibility={setStateVisibility}
      />
    </>
  );
}
