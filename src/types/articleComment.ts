import IArticle from "./article.type";
import IComment from "./comment.type";

export interface IArticleComment extends IComment {
  articleId: number;
  article: IArticle;
  childs: IArticleComment[];
}
