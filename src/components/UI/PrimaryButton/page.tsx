import styles from './page.module.css'

interface IPrimaryButton
{
    value: string,
    func: React.MouseEventHandler<HTMLButtonElement>,
}

export default function PrimaryButton(props: IPrimaryButton)
{
    return (
        <button className={styles.primaryButton} type="submit" onClick={props.func}>
            {props.value}
        </button>
    )
}