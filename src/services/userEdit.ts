import userRequest from "@/requests/user.request";
import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export async function getGeneral(id: number) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function editGeneral(
  id: number,
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  const formObject: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    formObject[key] = value as string;
  });

  const validationRes = userRequest.safeParse(formObject);

  if (!validationRes.success) {
    validationRes.error.issues.forEach((error) => {
      toast.error(error.message);
    });

    return;
  }

  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/edit/general`,
    { method: "POST", body: formData }
  );

  return res;
}
