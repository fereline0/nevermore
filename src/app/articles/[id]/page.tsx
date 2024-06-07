import { getArticle } from "@/services/article";
import IArticle from "@/types/article.type";
import "@/components/shared/TipTap/style.css";
import Article from "@/components/screens/Article/page";
import Comments from "@/components/screens/Article/Comments/page";

export const dynamic = "force-dynamic";

export default async function article({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const article: IArticle = await getArticle(params.id, page, limit);

  return (
    <Article article={article}>
      <Comments
        article={article}
        comments={article.comments}
        total={article._count.comments}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
      />
    </Article>
  );
}
