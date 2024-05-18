export async function userBan(id: number, initiatorId: number, expires: any) {
  const formData = new FormData();

  formData.append("initiatorId", initiatorId.toString());
  formData.append("expires", expires.toString());

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/ban`,
    { method: "POST", body: formData }
  );

  return res.json();
}

export async function deleteUserBans(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/ban`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}
