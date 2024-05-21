import useSWR from "swr";
import { clientFetcher, serverFetcher } from "@/utils/fetcher";
import IRole from "@/types/role.type";

export function getRoles(id: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/roles/${id}`;

  const { data, error, isLoading } = useSWR<IRole[]>(
    id ? url : null,
    clientFetcher
  );

  return {
    data,
    isLoading,
    error,
    url,
  };
}

export async function editRole(id: number, name: string) {
  const formData = new FormData();

  formData.append("name", name);

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/roles`,
    {
      method: "POST",
      body: formData,
    }
  );
}
