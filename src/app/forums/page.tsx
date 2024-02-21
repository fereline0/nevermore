import { getForums } from "@/services/forum";
import Articles from "@/components/Articles/page";

export const dynamic = "force-dynamic";

export default async function Forum({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const category = await getForums(page, limit);

  return (
    <Articles
      articles={category}
      total={50}
      limit={limit}
      pastPagesCount={2}
      futurePagesCount={4}
    />
  );
}
