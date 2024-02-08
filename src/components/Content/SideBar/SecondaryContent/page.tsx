import styles from "./page.module.css"
import Link from "next/link";

interface ISecondaryContent
{
    title: string,
    children: React.ReactNode,
}

export default function SecondaryContent(props: ISecondaryContent)
{
    return (
        <div className={styles.secondaryContent}>
            <div className={styles.title}>
                <Link href="">{props.title}</Link>
            </div>
            {props.children}
        </div>
    )
}