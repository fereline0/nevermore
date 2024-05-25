import IAbility from "@/types/ability.type";
import IUser from "@/types/user.type";

export function pageBelong(userId: number, currentUserId?: number) {
  return userId == currentUserId;
}

export function roleBenefits(roleId: number, currentRoleId?: number) {
  return currentRoleId !== undefined ? roleId < currentRoleId : false;
}

export function userCan(abilities: IAbility[] | undefined, action: string) {
  return abilities
    ? abilities.map((ability: any) => ability.slug).includes(action)
    : false;
}

export function isSubscribed(
  subscribers: { subscriber: IUser }[],
  currentUserId?: number
) {
  return subscribers.some(
    (subscriber: { subscriber: IUser }) =>
      subscriber.subscriber.id === currentUserId
  );
}
