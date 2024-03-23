import IUser from "./user.type";

export default interface IComment {
  id: number;
  value: string;
  createdAt: string;
  updatedAt: string;
  writer: IUser;
  childs: IComment[];
}
