import styles from './page.module.css'

interface IButton
{
    value: string,
    func: React.MouseEventHandler<HTMLButtonElement>,
}

export default function Button(props: IButton)
{
    return (
        <button className={styles.button} type="button" onClick={props.func}>
            {props.value}
        </button>
    )
}