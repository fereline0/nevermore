"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar/page";
import styles from "./page.module.css";
import IRole from "@/types/role.type";
import DangerAction from "./DangerAction/page";
import { deleteUser } from "@/services/user";

interface IPreview {
  id: number;
  image: string;
  role: IRole;
}

export default function Preview(props: IPreview) {
  const router = useRouter();

  const { data: session, status } = useSession();

  return (
    <div className={styles.preview}>
      <Avatar url={props.image} />
      <div className={styles.role}>
        <h3
          className={styles.role}
          style={{
            backgroundColor: `#${props.role.color}`,
          }}
        >
          {props.role.name}
        </h3>
      </div>
      {status === "authenticated" &&
        props.id != session?.user.id &&
        props.role.id < session?.user.role.id &&
        session?.user.role.abilities.map((ability: any) => {
          if (ability.slug == "deleteUser") {
            return (
              <DangerAction
                name="Delete user"
                description="You are sure"
                func={async () =>
                  await deleteUser(props.id).then(() => {
                    router.refresh();
                  })
                }
              />
            );
          }
          if (ability.slug == "ban") {
            return (
              <DangerAction
                name="Ban"
                description="You are sure"
                func={async () =>
                  await deleteUser(props.id).then(() => {
                    router.refresh();
                  })
                }
              />
            );
          }
        })}
    </div>
  );
}
