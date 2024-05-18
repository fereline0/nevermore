import IUser from "./user.type";

export default interface IBan {
  id: number;
  user: IUser;
  expires: string;
  initiator: IUser;
}
