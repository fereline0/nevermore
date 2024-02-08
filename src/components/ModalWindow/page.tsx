'use client'

const classNames = require('classnames/bind');
import styles from './page.module.css'
import DangerButton from "@/components/UI/DangerButton/page";
import Button from "@/components/UI/Button/page";
import { useEffect } from 'react';

interface IModalWinodw
{
    title: string,
    description: string,
    func: React.MouseEventHandler<HTMLButtonElement>,
    getVisibility: boolean,
    setVisibility: any,
}

export default function ModalWindow(props: IModalWinodw)
{
    const cx = classNames.bind(styles);

    const className = cx({
        overlay: true,
        active: props.getVisibility,
    });

    useEffect(() => {
        const closeOnEscapePressed = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            props.setVisibility(false);
          }
        };
        window.addEventListener("keydown", closeOnEscapePressed);
        return () =>
          window.removeEventListener("keydown", closeOnEscapePressed);
      }, []);
    

    return (
        <div className={className} onClick={() => props.setVisibility(false)}>
            <div className={styles.modalWinodw} onClick={e => e.stopPropagation()}>
                <div className={styles.title}>
                    <h3>{props.title}</h3>
                </div>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.solution}>
                    <DangerButton value={props.title} func={props.func} />
                    <Button value='Cancel' func={() => props.setVisibility(false)} />
                </div>
            </div>
        </div>
    )
}