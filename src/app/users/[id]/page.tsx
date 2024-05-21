import User from "@/components/screens/User/page";
import Loading from "@/components/shared/Loading/page";
import { getUser } from "@/services/user";
import IUser from "@/types/user.type";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function user({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const user: IUser = await getUser(params.id, page, limit);

  return (
    <Suspense fallback={<Loading />}>
      <User
        user={user}
        total={user._count.comments}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
