import IUser from "./user.type";

export default interface IComment {
  id: number;
  value: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: IUser;
  parentId: number;
  parent: IComment;
  writerId: number;
  writer: IUser;
  childs: IComment[];
  _count: any;
}
