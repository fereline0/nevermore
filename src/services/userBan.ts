import { serverFetcher } from "@/utils/fetcher";

export async function userBan(id: number, initiatorId: number, expires: any) {
  const formData = new FormData();

  formData.append("initiatorId", initiatorId.toString());
  formData.append("expires", expires.toString());

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
