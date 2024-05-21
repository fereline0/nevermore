import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";

export async function getUserSubscribers(
  id: number,
  page: number,
  limit: number
) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/subscribers?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function getUserSubscribed(
  id: number,
  page: number,
  limit: number
) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/subscribed?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}
