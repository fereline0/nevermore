import styles from "./page.module.css"

interface IItem
{
    value: string,
}

export default function Item(props: IItem)
{
    return (
        <li className={styles.item}>{props.value}</li>
    )
}