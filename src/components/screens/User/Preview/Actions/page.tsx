import { useRouter } from "next/navigation";
import Action from "./Action/page";
import DangerAction from "./DangerAction/page";
import { deleteUser } from "@/services/user";
import { signOut, useSession } from "next-auth/react";
import IUser from "@/types/user.type";
import { useTranslation } from "react-i18next";

interface IActions {
  user: IUser;
}

export default function Actions(props: IActions) {
  const { data: session, status } = useSession();
  const canDelete =
    status === "authenticated" &&
    props.user.id != session?.user.id &&
    session?.user.role.abilities.some(
      (ability: any) => ability.slug === "deleteUser"
    ) &&
    props.user.role.id < session?.user.role.id;
  const pageBelong = props.user.id == session?.user.id;
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div>
      {canDelete && (
        <DangerAction
          value={t("screens:user:preview:actions:deleteAccount:value")}
          description={t(
            "screens:user:preview:actions:deleteAccount:description"
          )}
          func={async () =>
            await deleteUser(props.user.id).then(() => {
              router.refresh();
            })
          }
        />
      )}
      {pageBelong && (
        <>
          <Action
            value={t("screens:user:preview:actions:changeInformation")}
            func={() => router.push("/users/edit/general")}
          />
          <DangerAction
            value={t("screens:user:preview:actions:signOut:value")}
            description={t("screens:user:preview:actions:signOut:description")}
            func={() => signOut({ callbackUrl: "/" })}
          />
        </>
      )}
    </div>
  );
}
