"use client";

import Users from "@/components/screens/Users/page";
import Loading from "@/components/shared/Loading/page";
import { getUsers } from "@/services/user";
import { notFound } from "next/navigation";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function users() {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState("");
  const limit = 20;

  const { data, error, isLoading } = getUsers(page, limit, searchParams);

  if (isLoading) return <Loading />;

  if (error) return notFound();

  return (
    data && (
      <Users
        users={data.users}
        newUsers={data.newUsers}
        total={data.count}
        pastPagesCount={2}
        futurePagesCount={4}
        page={page}
        setPage={setPage}
        limit={limit}
        setSearchParams={setSearchParams}
      />
    )
  );
}
