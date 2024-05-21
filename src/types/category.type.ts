import IArticle from "./article.type";

export default interface ICategory {
  id: number;
  name: string;
  articles: IArticle[];
  _count: any;
}
