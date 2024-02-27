import { FormEvent } from "react";

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
