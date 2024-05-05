"use client";

import IRole from "@/types/role.type";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";
import { IoMdMore } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Dropdown from "@/components/shared/Dropdown/page";
import Item from "@/components/shared/Dropdown/Item/page";
import AlightItems from "@/components/shared/AlightItems/page";
import { editRole, getRoles } from "@/services/roles";
import IUser from "@/types/user.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

interface Role {
  user: IUser;
  refresh: () => void;
}

export default function Role(props: Role) {
  const { t } = useTranslation();
  const actionsRef = useRef(null);
  const [visibility, setVisibility] = useState(false);
  const { data: session } = useSession();

  const {
    data: roles,
    error,
    isLoading,
    url,
  } = getRoles(session?.user.role.id);

  const canEditRole =
    session?.user.role.id > props.user.role.id &&
    props.user.id != session?.user.id &&
    session?.user.role.abilities.some(
      (ability: any) => ability.slug === "editUser"
    );

  return (
    <div className={styles.roleContainter} ref={actionsRef}>
      <AlightItems>
        <h3
          className={styles.role}
          style={{
            backgroundColor: `#${props.user.role.color}`,
          }}
        >
          {t(props.user.role.name)}
        </h3>
        {canEditRole && (
          <IoMdMore
            className={styles.icon}
            onClick={() => setVisibility(!visibility)}
          />
        )}
      </AlightItems>
      {canEditRole && (
        <Dropdown
          visibility={visibility}
          setVisibility={setVisibility}
          parentRef={actionsRef}
          right
        >
          {roles &&
            roles.map((role: IRole) => (
              <Item
                key={role.id}
                value={t(role.name)}
                func={async () =>
                  await editRole(props.user, session?.user.role.id, role.name)
                    .then(props.refresh)
                    .then(() => setVisibility(false))
                }
              />
            ))}
        </Dropdown>
      )}
    </div>
  );
}
