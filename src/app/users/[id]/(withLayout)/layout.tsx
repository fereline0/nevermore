import User from "@/components/screens/User/page";
import Loading from "@/components/shared/Loading/page";
import { getUser } from "@/services/user";
import IUser from "@/types/user.type";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function user({
  params,
  children,
}: {
  params: { id: number };
  children: React.ReactNode;
}) {
  const user: IUser = await getUser(params.id);

  return (
    <Suspense fallback={<Loading />}>
      <User user={user}>{children}</User>
    </Suspense>
  );
}
