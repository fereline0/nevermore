import General from "@/components/screens/User/Edit/General/page";
import { getUser } from "@/services/user";

export const dynamic = "force-dynamic";

export default async function general({ params }: { params: { id: number } }) {
  const user = await getUser(params.id, 1, 0);
  return <General user={user} />;
}
