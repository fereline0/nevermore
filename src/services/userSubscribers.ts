import IUser from "@/types/user.type";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function getUserSubscribers(id: number, page: number, limit: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/subscribers?page=${page}&limit=${limit}`;

  const { data, error, isLoading } = useSWR<
    IUser,
    {
      subscribers: { subscriber: IUser }[];
      _count: {
        subscribers: number;
      };
    }
  >(url, fetcher);

  return {
    data,
    isLoading,
    error,
    url,
  };
}
