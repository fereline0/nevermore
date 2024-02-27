import commentRequest from "@/requests/comment.request";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export async function createUserComment(
  event: FormEvent<HTMLFormElement>,
  userId: number,
  writerId: number
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  event.currentTarget.reset();

  formData.append("userId", userId.toString());
  formData.append("writerId", writerId.toString());

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
    `${process.env.NEXT_PUBLIC_API_URL}/api/userComments`,
    { method: "POST", body: formData }
  );

  return res.json();
}

export async function deleteUserComment(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/userComments/${id}`,
    {
      method: "DELETE",
    }
  );
  return res.json();
}
