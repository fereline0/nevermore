import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";
import { FormEvent } from "react";

export async function getUserBans(id: number, page: number, limit: number) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function userBan(
  event: FormEvent<HTMLFormElement>,
  id: number,
  initiatorId: number
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  formData.append("initiatorId", initiatorId.toString());

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans`,
    { method: "POST", body: formData }
  );
}

export async function deleteUserBans(id: number) {
  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans`,
    {
      method: "DELETE",
    }
  );
}
