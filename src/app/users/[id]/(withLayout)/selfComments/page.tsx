import SelfComments from "@/components/screens/User/SelfComments/page";
import Loading from "@/components/shared/Loading/page";
import { getSelfUserComments } from "@/services/userComment";
import IUser from "@/types/user.type";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function selfComments({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const user: IUser = await getSelfUserComments(params.id, page, limit);

  return (
    <Suspense fallback={<Loading />}>
      <SelfComments
        comments={user.writerComments}
        total={user._count.writerComments}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
