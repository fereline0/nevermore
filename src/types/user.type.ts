import IRole from "./role.type";

export default interface IUser {
  id: number;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  role: IRole;
  _count: any;
}
