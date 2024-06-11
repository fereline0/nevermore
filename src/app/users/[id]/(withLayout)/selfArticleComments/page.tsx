import SelfArticleComments from "@/components/screens/User/SelfArticleComments/page";
import Loading from "@/components/shared/Loading/page";
import { getSelfArticleComments } from "@/services/articleComment";
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
  const user: IUser = await getSelfArticleComments(params.id, page, limit);

  return (
    <Suspense fallback={<Loading />}>
      <SelfArticleComments
        comments={user.writerArticleComments}
        total={user._count.writerArticleComments}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
