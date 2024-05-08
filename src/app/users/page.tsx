import Users from "@/components/screens/Users/page";
import Loading from "@/components/shared/Loading/page";
import { getUsers } from "@/services/user";
import IUser from "@/types/user.type";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function users({
  searchParams,
}: {
  searchParams: { q: any; page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const res: { newUsers: IUser[]; users: IUser[]; count: number } =
    await getUsers(page, limit, searchParams.q);

  return (
    <Suspense fallback={<Loading />}>
      <Users
        newUsers={res.newUsers}
        users={res.users}
        total={res.count}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
