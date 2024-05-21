import { clientFetcher, serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";
import useSWR from "swr";

export async function getUserNotifications(
  id: number,
  page: number,
  limit: number
) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/notifications?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export function getUserNotificationsCount(id?: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/notifications/count`;

  const { data, error, isLoading } = useSWR<number>(
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

export async function createUserNotification(
  value: string,
  userId: number,
  writerId: number,
  sourceLink?: string
) {
  const formData = new FormData();

  formData.append("value", value.toString());
  formData.append("writerId", writerId.toString());
  sourceLink ? formData.append("sourceLink", sourceLink.toString()) : null;

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/notifications`,
    { method: "POST", body: formData }
  );
}

export async function updateStatusUserNotifications(userId: number) {
  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/notifications/status`,
    { method: "POST" }
  );
}

export async function updateStatusUserNotification(sourceLink: string) {
  const formData = new FormData();

  formData.append("sourceLink", sourceLink.toString());

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/notifications/status`,
    { method: "POST", body: formData }
  );
}
