import { notFound } from "next/navigation";

export async function getUserSubscribers(
  id: number,
  page: number,
  limit: number
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/subscribers?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}
