import styles from "./page.module.css"
import Image from "next/image";

interface IAvatar
{
    url: string
}

export default function Avatar(props: IAvatar)
{
    return (
        <div className={styles.avatar}>
            <Image className={styles.image} src={props.url ? props.url : '/noAvatar.jpg'} width="90" height="90" alt="user avatar" />
        </div>
    )
}