import Comments from "@/components/screens/User/Comments/page";
import Loading from "@/components/shared/Loading/page";
import { getUserComments } from "@/services/userComment";
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
  const user: IUser = await getUserComments(params.id, page, limit);

  return (
    <Suspense fallback={<Loading />}>
      <Comments
        userId={user.id}
        comments={user.comments}
        total={user._count.comments}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
