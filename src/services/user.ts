import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";

export async function getUsers(page: number, limit: number, query: string) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${page}&limit=${limit}${
      query ? `&q=${query}` : ""
    }`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function getUser(id: number) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function deleteUser(id: number) {
  await serverFetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
    method: "DELETE",
  });
}
