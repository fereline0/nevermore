import styles from "./page.module.css"
import Member from "@/components/Member/page";

interface ISubscribedList
{
    subscribers: any,
}

export default function SubscribedList(props: ISubscribedList)
{
    return (
        <div className={styles.subscribedList}>
            <ul>
                {props.subscribers.map((data: any) => {
                    return (
                        <Member member={data.user} detail={data.user.role.name} />
                    )
                })}
            </ul>
        </div>
    )
}