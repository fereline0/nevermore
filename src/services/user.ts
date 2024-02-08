import { notFound } from "next/navigation";

export async function getUser(id: number, page: number, limit: number)
{
    const res = await fetch(`http://127.0.0.1:3000/api/users/${id}?page=${page}&limit=${limit}`);

    if (!res.ok)
        notFound()

    return res.json();
}

export async function deleteUser(id: number) 
{
    const res = await fetch(`http://127.0.0.1:3000/api/users/${id}`, { method: 'DELETE' });
    return res.json();
}