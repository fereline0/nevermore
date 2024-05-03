import { useRouter } from "next/navigation";
import DangerAction from "./DangerAction/page";
import { deleteUser } from "@/services/user";
import { signOut, useSession } from "next-auth/react";
import IUser from "@/types/user.type";
import { useTranslation } from "react-i18next";
import Button from "@/components/UI/Button/page";
import MarginBottom from "@/components/shared/MarginBottom/page";

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
  const canEdit =
    status === "authenticated" &&
    session?.user.role.abilities.some(
      (ability: any) => ability.slug === "editUser"
    ) &&
    session?.user.role.id > props.user.role.id;
  const pageBelong = props.user.id == session?.user.id;
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div>
      <MarginBottom gap={5}>
        {(pageBelong || canEdit) && (
          <Button
            value={t("screens:user:preview:actions:changeInformation")}
            type="button"
            onClick={() => router.push(`/users/${props.user.id}/edit/general`)}
          />
        )}
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
          <DangerAction
            value={t("screens:user:preview:actions:signOut:value")}
            description={t("screens:user:preview:actions:signOut:description")}
            func={() => signOut({ callbackUrl: "/" })}
          />
        )}
      </MarginBottom>
    </div>
  );
}
