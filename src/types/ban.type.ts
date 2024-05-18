import IUser from "./user.type";

export default interface IBan {
  id: number;
  createdAt: string;
  user: IUser;
  activity: boolean;
  expires: string;
  initiator: IUser;
}
