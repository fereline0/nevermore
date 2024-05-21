import IArticle from "@/types/article.type";
import Article from "./Article/page";
import Pagination from "@/components/shared/Pagination/page";
import IPagination from "@/types/pagination.type";
import MarginBottom from "@/components/shared/MarginBottom/page";

interface IArticles extends IPagination {
  articles: IArticle[];
}

export default function Articles(props: IArticles) {
  return (
    <MarginBottom gap={10}>
      <MarginBottom gap={10}>
        {props.articles.map((article: IArticle) => {
          return <Article key={article.id} article={article} />;
        })}
      </MarginBottom>
      <Pagination
        total={props.total}
        limit={props.limit}
        pastPagesCount={props.pastPagesCount}
        futurePagesCount={props.futurePagesCount}
      />
    </MarginBottom>
  );
}
