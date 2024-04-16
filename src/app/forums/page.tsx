import { getForums } from "@/services/forum";
import Articles from "@/components/screens/Forums/Articles/page";
import IArticle from "@/types/article.type";

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
    <Articles
      articles={res.forums}
      total={res.count}
      limit={limit}
      pastPagesCount={2}
      futurePagesCount={4}
    />
  );
}
