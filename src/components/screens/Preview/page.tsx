"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar/page";
import styles from "./page.module.css";
import IRole from "@/types/role.type";
import Action from "./Action/page";
import DangerAction from "./DangerAction/page";
import { deleteUser } from "@/services/user";
import { signOut } from "next-auth/react";

interface IPreview {
  id: number;
  image: string;
  role: IRole;
}

export default function Preview(props: IPreview) {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        session?.user.role.abilities.some(
          (ability: any) => ability.slug === "deleteUser"
        ) &&
        props.role.id < session?.user.role.id && (
          <DangerAction
            value="Delete account"
            description="You are sure"
            func={async () =>
              await deleteUser(props.id).then(() => {
                router.refresh();
              })
            }
          />
        )}
      {props.id == session?.user.id && (
        <Action
          value="Sign out"
          description="You are sure"
          func={() => signOut({ callbackUrl: "/" })}
        />
      )}
    </div>
  );
}
