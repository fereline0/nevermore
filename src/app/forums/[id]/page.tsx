import styles from "./page.module.css";
import { getForum } from "@/services/forum";
import Articles from "@/components/screens/Articles/page";
import Search from "@/components/shared/Search/page";

export const dynamic = "force-dynamic";

export default async function Forum({
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
    <div className={styles.forum}>
      <div className={styles.title}>
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
    </div>
  );
}
