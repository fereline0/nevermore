'use client'

import Pagination from "../Pagination/page";
import styles from "./page.module.css"
import Member from "@/components/MemberList/Member/page";
import IPagination from "@/types/pagination.type"
import Dropdown from "@/components/Dropdown/page";
import Item from "@/components/Dropdown/Item/page";
import { useState } from "react";
import Button from "../UI/Button/page";

interface IComments extends IPagination
{
    comments: any,
}

export default function Comments(props: IComments)
{
    return (
        <div className={styles.comments}>
            <div className={styles.commentsList}>
                {props.comments.map((comment: any) => {
                    const [stateVisibility, setStateVisibility] = useState(false);

                    return (
                        <div className={styles.comment}>
                            <div className={styles.aboutWriter}>
                                <Member member={comment.writer} detail={comment.dateTime} />
                                <a className={styles.actions}>
                                    <Button value={"Actions"} func={() => setStateVisibility(!stateVisibility)} />
                                    <Dropdown getVisibility={stateVisibility} right={true} >
                                        <Item value="Change" />
                                        <Item value="Delete" />
                                    </Dropdown>
                                </a>
                            </div>
                            <div className={styles.value}>
                                {comment.value}
                            </div>
                        </div>
                    )
                })}
            </div>
            <Pagination total={props.total} limit={props.limit} pastPagesCount={props.pastPagesCount} futurePagesCount={props.futurePagesCount} />
        </div>
    )
}