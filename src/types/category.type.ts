import IArticle from "./article.type";
import IUser from "./user.type";

export default interface ICategory {
  id: number;
  name: string;
  articles: IArticle[];
  supervisors: IUser[];
  _count: any;
}
