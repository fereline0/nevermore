import styles from "./page.module.css"

interface ISideBar
{
    children: React.ReactNode,
}

export default function SideBar(props: ISideBar)
{
    return (
        <div className={styles.sideBar}>
            {props.children}
        </div>
    )
}