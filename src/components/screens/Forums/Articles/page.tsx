import styles from "./page.module.css";
import IArticle from "@/types/article.type";
import Article from "./Article/page";
import Pagination from "@/components/shared/Pagination/page";
import IPagination from "@/types/pagination.type";

interface IArticles extends IPagination {
  articles: IArticle[];
}

export default function Articles(props: IArticles) {
  return (
    <div className={styles.articles}>
      <div>
        {props.articles.map((article: IArticle) => {
          return <Article article={article} />;
        })}
      </div>
      <Pagination
        total={props.total}
        limit={props.limit}
        pastPagesCount={props.pastPagesCount}
        futurePagesCount={props.futurePagesCount}
      />
    </div>
  );
}
