import Link from "next/link";
import styles from "./page.module.css"
import Avatar from "./Avatar/page";

interface IMemberList 
{
    member: any,
    detail: string,
}

export default function Member(props: IMemberList)
{
    return (
        <div className={styles.member}>
            <Avatar url={props.member.image} />
            <div className={styles.about}>
                <Link href="">{props.member.name}</Link>
                <div className={styles.detail}>
                    <span>{props.detail}</span>
                </div>
            </div>
        </div>
    )
}