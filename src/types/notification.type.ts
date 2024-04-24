import IUser from "./user.type";

export default interface INotification {
  id: number;
  value: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  writer: IUser;
}
