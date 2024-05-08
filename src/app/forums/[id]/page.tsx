import { getForum } from "@/services/forum";
import Articles from "@/components/screens/Forums/Articles/page";
import Search from "@/components/shared/Search/page";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading/page";

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
  const category = await getForum(params.id, page, limit, searchParams.q);

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <h1>{category.name}</h1>
      </div>
      <Search />
      <Articles
        articles={category.articles}
        total={category._count.articles}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Suspense>
  );
}
