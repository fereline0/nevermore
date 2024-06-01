import IUser from "@/types/user.type";

export function userIsSupervisor(supervisors: IUser[], currentUserId?: number) {
  return currentUserId
    ? supervisors.map((user: IUser) => user.id).includes(currentUserId)
    : false;
}
