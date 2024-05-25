import IAbility from "@/types/ability.type";
import { roleBenefits, userCan } from "./user";

export function canDelete(
  userId: number,
  abilities: IAbility[],
  currentUserId?: number
) {
  return (
    userId === currentUserId ||
    (userCan(abilities, "deleteUser") && roleBenefits(userId, currentUserId))
  );
}

export function canRedirectToReplys(path: string, commentId: number) {
  return path != `/users/comments/${commentId}`;
}
