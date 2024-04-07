import Users from "@/components/screens/Users/page";
import { getUsers } from "@/services/user";
import IUser from "@/types/user.type";

export const dynamic = "force-dynamic";

export default async function users({
  searchParams,
}: {
  searchParams: { q: any; page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const res: { newUsers: IUser[]; users: IUser[]; count: number } =
    await getUsers(page, limit, searchParams.q);

  return <Users res={res} limit={limit} />;
}
