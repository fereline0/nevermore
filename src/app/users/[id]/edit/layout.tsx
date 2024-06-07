import Edit from "@/components/screens/User/Edit/layout";
import { getGeneral } from "@/services/userEdit";

export default async function Layout({
  params,
  children,
}: {
  params: { id: number };
  children: React.ReactNode;
}) {
  const user = await getGeneral(params.id);

  return <Edit user={user}>{children}</Edit>;
}
