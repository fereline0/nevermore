"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import DangerAction from "./DangerAction/page";
import { deleteUser } from "@/services/user";
import { signOut, useSession } from "next-auth/react";
import IUser from "@/types/user.type";
import { useTranslation } from "react-i18next";
import Button from "@/components/UI/Button/page";
import MarginBottom from "@/components/shared/MarginBottom/page";
import Dropdown from "@/components/shared/Dropdown/page";
import { useRef, useState } from "react";
import DangerItem from "@/components/shared/Dropdown/DangerItem/page";
import DangerButton from "@/components/UI/DangerButton/page";
import ban from "./ban";
import { deleteUserBans, userBan } from "@/services/userBan";
import { stringToCurrentDate } from "@/utils/stringToCurrentDate";
import { formatDistanceToNow } from "date-fns";
import { currentLocale } from "@/utils/currentLocale";
import IBan from "@/types/ban.type";
import { subscribe, unSubscribe } from "@/services/userSubscribers";
import {
  pageBelong,
  roleBenefits,
  userCan,
  isSubscribed,
} from "@/policies/user";

interface IActions {
  user: IUser;
  ban?: IBan;
}

export default function Actions(props: IActions) {
  const { data: session, status } = useSession();
  const locale = currentLocale();

  const canEdit = userCan(session?.user?.role?.abilities, "editUser");
  const canDelete = userCan(session?.user?.role?.abilities, "deleteUser");
  const canBan = userCan(session?.user?.role?.abilities, "ban");
  const belongsToUser = pageBelong(props.user.id, session?.user.id);
  const userIsSubscribed = isSubscribed(
    props.user.subscribers,
    session?.user.id
  );
  const userRoleBenefits = roleBenefits(
    props.user.role.id,
    session?.user.role.id
  );

  const router = useRouter();
  const { t } = useTranslation();
  const actionsRef = useRef(null);
  const [visibility, setVisibility] = useState(false);

  return (
    <MarginBottom gap={5}>
      {(belongsToUser || (canEdit && userRoleBenefits)) && (
        <Button
          value={t("screens:user:preview:actions:changeInformation")}
          type="button"
          onClick={() => router.push(`/users/${props.user.id}/edit/general`)}
        />
      )}
      {status === "authenticated" &&
        !belongsToUser &&
        (userIsSubscribed ? (
          <DangerAction
            value={t("screens:user:preview:actions:unSubscribe:value")}
            description={t(
              "screens:user:preview:actions:unSubscribe:description"
            )}
            func={async () => {
              await unSubscribe(props.user.id, session?.user.id);
              router.refresh();
            }}
          />
        ) : (
          <Button
            value={t("screens:user:preview:actions:subscribe")}
            type="button"
            onClick={async () => {
              await subscribe(props.user.id, session?.user.id);
              router.refresh();
            }}
          />
        ))}
      {status === "authenticated" &&
        canBan &&
        !belongsToUser &&
        userRoleBenefits && (
          <div className={styles.banContainer} ref={actionsRef}>
            {props.ban ? (
              <DangerAction
                value={t("screens:user:preview:actions:unBan:value")}
                description={t(
                  "screens:user:preview:actions:unBan:description"
                )}
                func={async () => {
                  await deleteUserBans(props.user.id);
                  router.refresh();
                }}
              />
            ) : (
              <div>
                <DangerButton
                  value={t("screens:user:preview:actions:ban:value")}
                  onClick={() => setVisibility(true)}
                />
                <Dropdown
                  visibility={visibility}
                  setVisibility={setVisibility}
                  parentRef={actionsRef}
                  right
                >
                  {ban.map((ban, index) => {
                    const formattedDistance = formatDistanceToNow(
                      stringToCurrentDate(ban),
                      { locale }
                    );
                    const capitalizedValue =
                      formattedDistance.charAt(0).toUpperCase() +
                      formattedDistance.slice(1);
                    return (
                      <DangerItem
                        key={index}
                        value={capitalizedValue}
                        description={t(
                          "screens:user:preview:actions:ban:description"
                        )}
                        func={async () => {
                          await userBan(
                            props.user.id,
                            session?.user.id,
                            stringToCurrentDate(ban)
                          );
                          router.refresh();
                        }}
                      />
                    );
                  })}
                </Dropdown>
              </div>
            )}
          </div>
        )}
      {canDelete && !belongsToUser && userRoleBenefits && (
        <DangerAction
          value={t("screens:user:preview:actions:deleteAccount:value")}
          description={t(
            "screens:user:preview:actions:deleteAccount:description"
          )}
          func={async () => {
            await deleteUser(props.user.id);
            router.refresh();
          }}
        />
      )}
      {belongsToUser && (
        <DangerAction
          value={t("screens:user:preview:actions:signOut:value")}
          description={t("screens:user:preview:actions:signOut:description")}
          func={() => signOut({ callbackUrl: "/" })}
        />
      )}
    </MarginBottom>
  );
}
