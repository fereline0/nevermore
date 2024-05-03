import IUser from "@/types/user.type";

export async function getRoles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/roles`);

  return res.json();
}

export async function editRole(
  user: IUser,
  currentRoleId: number,
  name: string
) {
  if (currentRoleId <= user.role.id) {
    return;
  }

  const formData = new FormData();

  formData.append("name", name);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/roles`,
    { method: "POST", body: formData }
  );

  return res.json();
}
