import { getForum } from "@/services/forum";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading/page";
import Forum from "@/components/screens/Forum/page";
import ICategory from "@/types/category.type";

export const dynamic = "force-dynamic";

export default async function forum({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { q: any; page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const category: ICategory = await getForum(
    params.id,
    page,
    limit,
    searchParams.q
  );

  return (
    <Suspense fallback={<Loading />}>
      <Forum
        category={category}
        total={category._count.articles}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
