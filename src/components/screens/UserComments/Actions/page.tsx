"use client";

import Button from "@/components/UI/Button/page";
import Dropdown from "@/components/shared/Dropdown/page";
import Item from "@/components/shared/Dropdown/Item/page";
import Separator from "@/components/shared/Dropdown/Separator/page";
import DangerItem from "@/components/shared/Dropdown/DangerItem/page";
import { deleteUserComment } from "@/services/userComment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import IComment from "@/types/comment.type";

interface IActions {
  comment: IComment;
}

export default function Actions(props: IActions) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stateVisibility, setStateVisibility] = useState(false);

  return (
    <div>
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
                description="Are you sure you want to permanently delete this comment?"
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
  );
}
