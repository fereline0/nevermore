import { useRouter } from "next/navigation";
import Action from "./Action/page";
import DangerAction from "./DangerAction/page";
import { deleteUser } from "@/services/user";
import { signOut, useSession } from "next-auth/react";
import IUser from "@/types/user.type";

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

  return (
    <div>
      {canDelete && (
        <DangerAction
          value="Delete account"
          description="Are you sure you want to delete the user account from the database, this action is irreversible!"
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
            value="Change information"
            func={() => router.push("/users/edit/general")}
          />
          <DangerAction
            value="Sign out"
            description="Are you sure you want to sign out of your account?"
            func={() => signOut({ callbackUrl: "/" })}
          />
        </>
      )}
    </div>
  );
}
