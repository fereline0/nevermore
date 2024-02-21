import { notFound } from "next/navigation";

export async function getSections() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/forums/sections`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function getForums(page: number, limit: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/forums?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function getForum(
  id: number,
  page: number,
  limit: number,
  query: any
) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/forums/${id}?page=${page}&limit=${limit}${query ? `&q=${query}` : ""}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function getArticle(id: number, page: number, limit: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}
