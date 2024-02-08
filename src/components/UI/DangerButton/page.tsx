import styles from './page.module.css'

interface IDangerButton
{
    value: string,
    func: React.MouseEventHandler<HTMLButtonElement>,
}

export default function DangerButton(props: IDangerButton)
{
    return (
        <button className={styles.dangerButton} type="submit" onClick={props.func}>
            {props.value}
        </button>
    )
}