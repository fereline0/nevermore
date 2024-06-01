import { getArticle } from "@/services/article";
import IArticle from "@/types/article.type";
import "@/components/shared/TipTap/style.css";
import Article from "@/components/screens/Article/page";

export const dynamic = "force-dynamic";

export default async function article({ params }: { params: { id: number } }) {
  const article: IArticle = await getArticle(params.id);

  return <Article article={article} />;
}
