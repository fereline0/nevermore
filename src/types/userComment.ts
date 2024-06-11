import IComment from "./comment.type";
import IUser from "./user.type";

export interface IUserComment extends IComment {
  userId: number;
  user: IUser;
  childs: IUserComment[];
}
