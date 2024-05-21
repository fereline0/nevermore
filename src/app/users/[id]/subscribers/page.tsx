import Subscribers from "@/components/screens/User/Subscribers/page";
import Loading from "@/components/shared/Loading/page";
import { getUserSubscribers } from "@/services/userSubscribers";
import IUser from "@/types/user.type";
import { Suspense } from "react";

interface ISubscribers extends IUser {
  subscribers: { subscriber: IUser }[];
  _count: {
    subscribers: number;
  };
}

export const dynamic = "force-dynamic";

export default async function subscribers({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const res: ISubscribers = await getUserSubscribers(params.id, page, limit);

  return (
    <Suspense fallback={<Loading />}>
      <Subscribers
        subscribers={res.subscribers}
        total={res._count.subscribers}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
