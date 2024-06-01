import articleRequest from "@/requests/article.request";
import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export async function getArticle(id: number) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function createArticle(
  event: FormEvent<HTMLFormElement>,
  value: string,
  authorId: number,
  categoryId: number
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  formData.append("value", value.toString());
  formData.append("authorId", authorId.toString());
  formData.append("categoryId", categoryId.toString());

  const formObject: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    formObject[key] = value as string;
  });

  const validationRes = articleRequest.safeParse(formObject);

  if (!validationRes.success) {
    validationRes.error.issues.forEach((error) => {
      toast.error(error.message);
    });

    return false;
  }

  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
    { method: "POST", body: formData }
  );

  return res.json();
}

export async function deleteArticle(id: number) {
  await serverFetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`, {
    method: "DELETE",
  });
}
