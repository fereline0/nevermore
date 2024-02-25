import { notFound } from "next/navigation";

export async function getUsers(page: number, limit: number, query: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${page}&limit=${limit}${
      query ? `&q=${query}` : ""
    }`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function getUser(id: number, page: number, limit: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
    {
      method: "DELETE",
    }
  );
  return res.json();
}
