'use client'

import styles from "./page.module.css"
import Button from "@/components/UI/Button/page";
import ModalWindow from "@/components/ModalWindow/page";
import { useState } from "react";

interface IActions
{
    abilities: any,
    actions: any,
}

export default function Actions(props: IActions)
{
    return (
        <div className={styles.actions}>
            {props.abilities.map((ability: any) => {
                return (
                    props.actions[ability.slug].map((action: any) => {
                        const [stateVisibility, setStateVisibility] = useState(false);

                        function openWinodw()
                        {
                            setStateVisibility(true);
                        }

                        return (
                            <div>
                                <Button value={action.name} func={openWinodw} />
                                <ModalWindow title={action.name} description={action.description} func={async() => await action.func()} getVisibility={stateVisibility} setVisibility={setStateVisibility} />
                            </div>
                        )
                    })
                )
            })}
        </div>
    )
}