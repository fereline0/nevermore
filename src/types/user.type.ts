import IArticle from "./article.type";
import { IArticleComment } from "./articleComment";
import IBan from "./ban.type";
import ICategory from "./category.type";
import IRole from "./role.type";
import { IUserComment } from "./userComment";

export default interface IUser {
  id: number;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  detailInformation: any;
  role: IRole;
  subscribers: any[];
  subscribed: any[];
  comments: IUserComment[];
  writerComments: IUserComment[];
  writerArticleComments: IArticleComment[];
  administeredCategories: ICategory[];
  articles: IArticle[];
  bans: IBan[];
  _count: any;
}
