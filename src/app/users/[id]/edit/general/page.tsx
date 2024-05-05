import General from "@/components/screens/User/Edit/General/page";
import { getGeneral } from "@/services/userEdit";

export const dynamic = "force-dynamic";

export default async function general({ params }: { params: { id: number } }) {
  const user = await getGeneral(params.id);
  return <General user={user} />;
}
