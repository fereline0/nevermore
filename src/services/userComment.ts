export async function deleteUserComment(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/userComments/${id}`,
    {
      method: "DELETE",
    }
  );
  return res.json();
}
