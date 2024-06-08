import Articles from "@/components/screens/Forums/Articles/page";
import Loading from "@/components/shared/Loading/page";
import { getUserArticles } from "@/services/article";
import IUser from "@/types/user.type";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function articles({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const user: IUser = await getUserArticles(params.id, page, limit);

  return (
    <Suspense fallback={<Loading />}>
      <Articles
        articles={user.articles}
        total={user._count.articles}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
