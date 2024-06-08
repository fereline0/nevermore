import Bans from "@/components/screens/User/Bans/page";
import Loading from "@/components/shared/Loading/page";
import { getUserBans } from "@/services/userBan";
import IUser from "@/types/user.type";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function comments({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const user: IUser = await getUserBans(params.id, page, limit);

  return (
    <Suspense fallback={<Loading />}>
      <Bans
        bans={user.bans}
        total={user._count.bans}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
