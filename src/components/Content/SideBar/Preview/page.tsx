'use client'

import { useSession } from "next-auth/react"
import Avatar from "./Avatar/page"
import styles from "./page.module.css"
import IRole from "@/types/role.type"
import User from "@/actions/user"
import Actions from "./Actions/page"

interface IPreview
{
    image: string,
    role: IRole,
}

export default function Preview(props: IPreview)
{
    const { data: session, status } = useSession();

    return (
        <div className={styles.preview}>
            <Avatar url={props.image} />
            <div className={styles.role}>
                <h3 className={styles.role} style={{
                    backgroundColor: `#${props.role.color}`,
                }}>{props.role.name}</h3>
            </div>
            {
                (() => {
                    if (status === "authenticated") { 

                        const abilities = session?.user.role.abilities;

                        if (abilities.length > 0) {
                            return (
                                <Actions actions={User} abilities={abilities}  />
                            )   
                        }
                    }
                })()
            }
        </div>
    )
}