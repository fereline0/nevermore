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

interface IActions {
  user: IUser;
  ban?: IBan;
}

export default function Actions(props: IActions) {
  const { data: session, status } = useSession();
  const locale = currentLocale();

  const roleBenefits = props.user.role.id < session?.user.role.id;
  const pageBelong = props.user.id == session?.user.id;
  const abilities = session?.user?.role?.abilities;
  const userRoleAbilities = abilities
    ? abilities.map((ability: any) => ability.slug)
    : [];
  const canDelete = userRoleAbilities.includes("deleteUser");
  const canEdit = userRoleAbilities.includes("editUser");
  const canBan = userRoleAbilities.includes("ban");

  const ifSubscribe = props.user.subscribers.some(
    (subscriber: { subscriber: IUser }) =>
      subscriber.subscriber.id === session?.user.id
  );

  const router = useRouter();
  const { t } = useTranslation();
  const actionsRef = useRef(null);
  const [visibility, setVisibility] = useState(false);

  return (
    <MarginBottom gap={5}>
      {(pageBelong || (canEdit && roleBenefits)) && (
        <Button
          value={t("screens:user:preview:actions:changeInformation")}
          type="button"
          onClick={() => router.push(`/users/${props.user.id}/edit/general`)}
        />
      )}
      {status === "authenticated" &&
        !pageBelong &&
        (ifSubscribe ? (
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
      {status === "authenticated" && canBan && !pageBelong && roleBenefits && (
        <div className={styles.banContainer} ref={actionsRef}>
          {props.ban ? (
            <DangerAction
              value={t("screens:user:preview:actions:unBan:value")}
              description={t("screens:user:preview:actions:unBan:description")}
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
      {canDelete && !pageBelong && roleBenefits && (
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
      {pageBelong && (
        <DangerAction
          value={t("screens:user:preview:actions:signOut:value")}
          description={t("screens:user:preview:actions:signOut:description")}
          func={() => signOut({ callbackUrl: "/" })}
        />
      )}
    </MarginBottom>
  );
}
