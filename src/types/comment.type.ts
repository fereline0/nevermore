import IUser from "./user.type";

export default interface IComment {
  id: number;
  value: string;
  createdAt: string;
  updatedAt: string;
  parentId: number;
  parent: IComment;
  writerId: number;
  writer: IUser;
  _count: any;
}
