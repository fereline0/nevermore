import { notFound } from "next/navigation";
import { FormEvent } from "react";

export async function getUserNotifications(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/notifications`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function createUserNotification(
  event: FormEvent<HTMLFormElement>,
  userId: number,
  writerId: number
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  formData.append("writerId", writerId.toString());

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/notifications`,
    { method: "POST", body: formData }
  );

  return res.json();
}

export async function updateStatusUserNotification(userId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/notifications`,
    { method: "POST" }
  );

  return res.json();
}
