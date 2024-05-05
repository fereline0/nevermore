import IUser from "@/types/user.type";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import IRole from "@/types/role.type";

export function getRoles(id: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/roles/${id}`;

  const { data, error, isLoading } = useSWR<IRole[]>(url, fetcher);

  return {
    data,
    isLoading,
    error,
    url,
  };
}

export async function editRole(
  user: IUser,
  currentRoleId: number,
  name: string
) {
  if (currentRoleId <= user.role.id) {
    return;
  }

  const formData = new FormData();

  formData.append("name", name);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/roles`,
    { method: "POST", body: formData }
  );

  return res.json();
}
