import { serverFetcher } from "@/utils/fetcher";
import { FormEvent } from "react";

export async function userBan(
  event: FormEvent<HTMLFormElement>,
  id: number,
  initiatorId: number
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  formData.append("initiatorId", initiatorId.toString());

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/ban`,
    { method: "POST", body: formData }
  );
}

export async function deleteUserBans(id: number) {
  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/ban`,
    {
      method: "DELETE",
    }
  );
}
