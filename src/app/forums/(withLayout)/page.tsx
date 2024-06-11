import { getForums } from "@/services/forum";
import Articles from "@/components/screens/Articles/page";
import IArticle from "@/types/article.type";
import Loading from "@/components/shared/Loading/page";
import { Suspense } from "react";
import Main from "@/components/shared/Content/Main/page";

export const dynamic = "force-dynamic";

export default async function forums({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const res: { forums: IArticle[]; count: number } = await getForums(
    page,
    limit
  );

  return (
    <Suspense fallback={<Loading />}>
      <Main>
        <Articles
          articles={res.forums}
          total={res.count}
          limit={limit}
          pastPagesCount={2}
          futurePagesCount={4}
        />
      </Main>
    </Suspense>
  );
}
