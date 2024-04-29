import { notFound } from "next/navigation";

export async function getUserNotifications(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/notifications`
  );

  if (!res.ok) notFound();

  return res.json();
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/notifications`,
    { method: "POST", body: formData }
  );

  return res.json();
}

export async function updateStatusUserNotification(userId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/notifications/status`,
    { method: "POST" }
  );

  return res.json();
}
