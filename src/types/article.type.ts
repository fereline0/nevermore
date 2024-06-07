import ICategory from "./category.type";
import IComment from "./comment.type";
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
  comments: IComment[];
  _count: any;
}
