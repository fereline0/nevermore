import Subscribed from "@/components/screens/User/Subscribed/page";
import Loading from "@/components/shared/Loading/page";
import { getUserSubscribed } from "@/services/userSubscribers";
import IUser from "@/types/user.type";
import { Suspense } from "react";

interface ISubscribed extends IUser {
  subscribed: { user: IUser }[];
  _count: {
    subscribed: number;
  };
}

export const dynamic = "force-dynamic";

export default async function subscribed({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const res = await getUserSubscribed(params.id, page, limit);

  return (
    <Suspense fallback={<Loading />}>
      <Subscribed
        subscribed={res.subscribed}
        total={res._count.subscribed}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
