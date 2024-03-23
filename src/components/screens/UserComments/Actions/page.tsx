"use client";

import { IoMdMore } from "react-icons/io";
import styles from "./page.module.css";
import Dropdown from "@/components/shared/Dropdown/page";
import Item from "@/components/shared/Dropdown/Item/page";
import Separator from "@/components/shared/Dropdown/Separator/page";
import DangerItem from "@/components/shared/Dropdown/DangerItem/page";
import { deleteUserComment } from "@/services/userComment";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import IComment from "@/types/comment.type";

interface IActions {
  comment: IComment;
}

export default function Actions(props: IActions) {
  const { data: session } = useSession();
  const actionsRef = useRef(null);
  const [visibility, setVisibility] = useState(false);
  const router = useRouter();
  const canDelete =
    props.comment.writer.id == session?.user.id ||
    (session?.user.role.abilities.some(
      (ability: any) => ability.slug === "deleteComment"
    ) &&
      props.comment.writer.role.id < session?.user.role.id);

  return (
    <div ref={actionsRef}>
      <IoMdMore
        className={styles.icon}
        onClick={() => setVisibility(!visibility)}
      />
      <Dropdown
        right={true}
        parentRef={actionsRef}
        visibility={visibility}
        setVisibility={setVisibility}
      >
        <Item
          value="Replys"
          func={() => router.push(`/users/comments/${props.comment.id}`)}
        />
        {canDelete && (
          <>
            <Separator />
            <DangerItem
              value="Delete"
              description="Are you sure you want to permanently delete this comment?"
              func={async () =>
                await deleteUserComment(props.comment.id)
                  .then(() => {
                    router.refresh();
                  })
                  .then(() => {
                    setVisibility(false);
                  })
              }
            />
          </>
        )}
      </Dropdown>
    </div>
  );
}
