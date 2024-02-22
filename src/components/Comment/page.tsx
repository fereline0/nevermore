"use client";

import styles from "./page.module.css";
import Member from "@/components/Member/page";
import Dropdown from "@/components/Dropdown/page";
import Separator from "@/components/Dropdown/Separator/page";
import DangerItem from "@/components/Dropdown/DangerItem/page";
import Item from "@/components/Dropdown/Item/page";
import Button from "@/components/UI/Button/page";
import IComment from "@/types/comment.type";
import { deleteUserComment } from "@/services/userComment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface Comment {
  comment: IComment;
}

export default function Comment(props: Comment) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stateVisibility, setStateVisibility] = useState(false);

  return (
    <div className={styles.comment}>
      <div className={styles.aboutWriter}>
        <Member
          member={props.comment.writer}
          detail={props.comment.createdAt}
        />
        <div className={styles.actions}>
          <Button
            value={"Actions"}
            func={() => setStateVisibility(!stateVisibility)}
          />
          <Dropdown right={true} getVisibility={stateVisibility}>
            <Item value="Change" func={() => alert(11)} />
            <Item value="Viewers" func={() => alert(22)} />
            {status === "authenticated" &&
              (props.comment.writer.id == session?.user.id ||
                (session?.user.role.abilities.some(
                  (ability: any) => ability.slug === "deleteComment"
                ) &&
                  props.comment.writer.role.id < session?.user.role.id)) && (
                <>
                  <Separator />
                  <DangerItem
                    value="Delete"
                    description="You are sure"
                    func={async () =>
                      await deleteUserComment(props.comment.id)
                        .then(() => {
                          router.refresh();
                        })
                        .then(() => {
                          setStateVisibility(false);
                        })
                    }
                  />
                </>
              )}
          </Dropdown>
        </div>
      </div>
      <div className={styles.value}>{props.comment.value}</div>
    </div>
  );
}
