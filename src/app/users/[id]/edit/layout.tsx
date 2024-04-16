import Edit from "@/components/screens/User/Edit/layout";

export default async function Layout({
  params,
  children,
}: {
  params: { id: number };
  children: React.ReactNode;
}) {
  return <Edit id={params.id}>{children}</Edit>;
}
