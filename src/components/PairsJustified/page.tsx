import styles from "./page.module.css"
import Row from "./Row/page";

function toSentenceCase(text: string)
{
    const result = text.replace(/([A-Z])/g, " $1")
    return result[0].toUpperCase() + result.substring(1).toLowerCase();
}

interface IPairsJustified
{
    data: any,
}

export default function PairsJustified(props: IPairsJustified)
{
    return (
        <div className={styles.pairsJustified}>
            {Object.keys(props.data).map((key) => {
                if (props.data[key] != null)
                    return (
                        <Row label={toSentenceCase(key)} value={props.data[key]} />
                    )
            })}
        </div>
    )
}