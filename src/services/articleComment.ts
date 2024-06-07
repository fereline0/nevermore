import commentRequest from "@/requests/comment.request";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { notFound } from "next/navigation";
import { serverFetcher } from "@/utils/fetcher";

export async function getArticleComment(
  id: number,
  page: number,
  limit: number
) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/comments/${id}?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function createArticleComment(
  event: FormEvent<HTMLFormElement>,
  articleId: number,
  writerId: number,
  parentId?: number
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  event.currentTarget.reset();

  formData.append("articleId", articleId.toString());
  formData.append("writerId", writerId.toString());
  parentId && formData.append("parentId", parentId.toString());

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

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/comments`,
    { method: "POST", body: formData }
  );
}

export async function deleteArticleComment(id: number) {
  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/comments/${id}`,
    {
      method: "DELETE",
    }
  );
}
