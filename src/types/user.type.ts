import IComment from "./comment.type";
import IRole from "./role.type";

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
  comments: IComment[];
  _count: any;
}
