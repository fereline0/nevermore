"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar/page";
import styles from "./page.module.css";
import IRole from "@/types/role.type";
import Action from "./Action/page";
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
      {props.id != session?.user.id &&
        status === "authenticated" &&
        props.role.id < session?.user.role.id &&
        session?.user.role.abilities.map((ability: any) => {
          if (ability.slug == "deleteUser") {
            return (
              <Action
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
              <Action
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
