import User from "@/components/screens/User/page";
import { getUser } from "@/services/user";

export const dynamic = "force-dynamic";

export default async function user({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const currentUser = await getUser(params.id, page, limit);

  return <User id={params.id} limit={limit} user={currentUser} />;
}
