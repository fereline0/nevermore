import styles from "./page.module.css"
import Member from "@/components/Member/page";

interface ISubscriberList
{
    subscribers: any,
}

export default function SubscriberList(props: ISubscriberList)
{
    return (
        <div className={styles.subscriberList}>
            <ul>
                {props.subscribers.map((data: any) => {
                    return (
                        <Member member={data.subscriber} detail={data.subscriber.role.name} />
                    )
                })}
            </ul>
        </div>
    )
}