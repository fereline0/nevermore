import userRequest from "@/requests/user.request";
import { FormEvent } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import toast from "react-hot-toast";
import IUser from "@/types/user.type";

export async function getUsers(page: number, limit: number, query: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${page}&limit=${limit}${
      query ? `&q=${query}` : ""
    }`
  );

  if (!res.ok) throw new Error();
  return res.json();
}

export function getUser(id: number, page: number, limit: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}?page=${page}&limit=${limit}`;

  const { data, error, isLoading } = useSWR<IUser>(url, fetcher);

  return {
    data,
    isLoading,
    error,
    url,
  };
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
