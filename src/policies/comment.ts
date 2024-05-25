import IAbility from "@/types/ability.type";
import { pageBelong, roleBenefits, userCan } from "./user";

export function canRedirectToReplys(path: string, commentId: number) {
  return path != `/users/comments/${commentId}`;
}
