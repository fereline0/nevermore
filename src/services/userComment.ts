import commentRequest from "@/requests/comment.request";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { createUserNotification } from "./userNotification";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import IComment from "@/types/comment.type";

export function getUserComment(id: number, page: number, limit: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}?page=${page}&limit=${limit}`;

  const { data, error, isLoading } = useSWR<IComment>(url, fetcher);

  return {
    data,
    isLoading,
    error,
    url,
  };
}

export async function createUserComment(
  event: FormEvent<HTMLFormElement>,
  userId: number,
  currentUserId: number,
  writerId?: number,
  parentId?: number
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  event.currentTarget.reset();

  formData.append("userId", userId.toString());
  formData.append("writerId", currentUserId.toString());
  parentId ? formData.append("parentId", parentId.toString()) : null;

  const formObject: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    formObject[key] = value as string;
  });

  const validationRes = commentRequest.safeParse(formObject);

  if (!validationRes.success) {
    validationRes.error.issues.forEach((error) => {
      toast.error(error.message);
    });

    return;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments`,
    { method: "POST", body: formData }
  );

  const responseJson = await res.json();

  if (currentUserId != (writerId ? writerId : userId)) {
    await createUserNotification(
      parentId
        ? "screens:comments:notifications:reply"
        : "screens:comments:notifications:newMessage",
      writerId ? writerId : userId,
      currentUserId,
      `/users/comments/${responseJson.id}`
    );
  }

  return responseJson;
}

export async function deleteUserComment(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}
