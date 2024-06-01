import CreateArticle from "@/components/screens/Forum/CreateArticle/page";
import { getCategory } from "@/services/forum";
import ICategory from "@/types/category.type";

export default async function createArticle({
  params,
}: {
  params: { id: number };
}) {
  const category: ICategory = await getCategory(params.id);

  return <CreateArticle category={category} />;
}
