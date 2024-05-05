"use client";

import Users from "@/components/screens/Users/page";
import Loading from "@/components/shared/Loading/page";
import { getUsers } from "@/services/user";
import IUser from "@/types/user.type";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function users() {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState("");
  const limit = 20;

  const [users, setUsers] = useState(null);
  const [error, setError] = useState(false);

  async function fetchUser() {
    try {
      const user = await getUsers(page, limit, searchParams);
      setUsers(user);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [page, limit, searchParams]);

  if (error) {
    notFound();
  }

  return users ? (
    <Users
      res={users}
      page={page}
      setPage={setPage}
      limit={limit}
      setSearchParams={setSearchParams}
    />
  ) : (
    <Loading />
  );
}
