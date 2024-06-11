import { IArticleComment } from "./articleComment";
import ICategory from "./category.type";
import IUser from "./user.type";

export default interface IArticle {
  id: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  title: string;
  value: string;
  author: IUser;
  category: ICategory;
  comments: IArticleComment[];
  _count: any;
}
