"use client";

import { IoMdMore } from "react-icons/io";
import styles from "./page.module.css";
import Dropdown from "@/components/shared/Dropdown/page";
import Item from "@/components/shared/Dropdown/Item/page";
import DangerItem from "@/components/shared/Dropdown/DangerItem/page";
import { deleteUserComment } from "@/services/userComment";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import IComment from "@/types/comment.type";
import { useTranslation } from "react-i18next";
import Separated from "@/components/shared/Dropdown/Separated/page";

interface IActions {
  comment: IComment;
}

export default function Actions(props: IActions) {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const actionsRef = useRef(null);
  const [visibility, setVisibility] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const canDelete =
    props.comment.writer.id == session?.user.id ||
    (session?.user.role.abilities.some(
      (ability: any) => ability.slug === "deleteComment"
    ) &&
      props.comment.writer.role.id < session?.user.role.id);

  const canRedirectToReplys = path != `/users/comments/${props.comment.id}`;

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
        <Separated>
          {canRedirectToReplys && (
            <Item
              value={t("screens:comments:actions:replys")}
              func={() => router.push(`/users/comments/${props.comment.id}`)}
            />
          )}
          {canDelete && (
            <DangerItem
              value={t("screens:comments:actions:delete:value")}
              description={t("screens:comments:actions:delete:description")}
              func={async () =>
                await deleteUserComment(props.comment.id)
                  .then(router.refresh)
                  .then(() => {
                    setVisibility(false);
                  })
              }
            />
          )}
        </Separated>
      </Dropdown>
    </div>
  );
}
