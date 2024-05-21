import { getCategory } from "@/services/forum";
import ICategory from "@/types/category.type";

export default async function createArticle({
  params,
}: {
  params: { id: number };
}) {
  const category: ICategory = await getCategory(params.id);

  return <h1>Создание статьи в категории {category.name}</h1>;
}
