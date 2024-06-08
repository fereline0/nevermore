import IUser from "./user.type";

export default interface IBan {
  id: number;
  createdAt: string;
  user: IUser;
  reason?: string;
  activity: boolean;
  expires: string;
  initiator: IUser;
  _count: any;
}
