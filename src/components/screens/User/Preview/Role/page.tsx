"use client";

import IRole from "@/types/role.type";
import styles from "./page.module.css";
import { IoMdMore } from "react-icons/io";
import { useRef, useState } from "react";
import Dropdown from "@/components/shared/Dropdown/page";
import Item from "@/components/shared/Dropdown/Item/page";
import AlightItems from "@/components/shared/AlightItems/page";
import { editRole, getRoles } from "@/services/roles";
import IUser from "@/types/user.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { pageBelong, roleBenefits, userCan } from "@/policies/user";

interface Role {
  user: IUser;
}

export default function Role(props: Role) {
  const actionsRef = useRef(null);
  const [visibility, setVisibility] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const canEditRole =
    userCan(session?.user.role.abilities, "editUserRole") &&
    roleBenefits(props.user.role.id, session?.user.role.id) &&
    !pageBelong(props.user.id, session?.user.id);

  const { data: roles } = getRoles(canEditRole ? session?.user.role.id : null);

  return (
    <div className={styles.roleContainter} ref={actionsRef}>
      <AlightItems gap={5}>
        <h3
          className={styles.role}
          style={{
            background: `${props.user.role.color}`,
          }}
        >
          {props.user.role.name}
        </h3>
        {roles && (
          <IoMdMore
            className={styles.icon}
            onClick={() => setVisibility(!visibility)}
          />
        )}
      </AlightItems>
      {roles && (
        <Dropdown
          visibility={visibility}
          setVisibility={setVisibility}
          parentRef={actionsRef}
          right
        >
          {roles.map((role: IRole) => (
            <Item
              key={role.id}
              value={role.name}
              func={async () =>
                await editRole(props.user.id, role.name)
                  .then(router.refresh)
                  .then(() => setVisibility(false))
              }
            />
          ))}
        </Dropdown>
      )}
    </div>
  );
}
