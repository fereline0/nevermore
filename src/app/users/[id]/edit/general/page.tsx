import General from "@/components/screens/User/Edit/General/page";
import Loading from "@/components/shared/Loading/page";
import { getGeneral } from "@/services/userEdit";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function general({ params }: { params: { id: number } }) {
  const user = await getGeneral(params.id);
  return (
    <Suspense fallback={<Loading />}>
      <General user={user} />
    </Suspense>
  );
}
