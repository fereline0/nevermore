import styles from "./page.module.css"
import Member from "./Member/page";

interface IMemberList 
{
    members: any,
    columnName: string,
}

export default function MemberList(props: IMemberList)
{
    return (
        <div className={styles.memberList}>
            <ul>
                {props.members.map((user: any) => {
                    return (
                        <Member member={user[props.columnName]} detail={user[props.columnName].role.name} />
                    )
                })}
            </ul>
        </div>
    )
}