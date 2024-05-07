"use client";

import User from "@/components/screens/User/page";
import Loading from "@/components/shared/Loading/page";
import { getUser } from "@/services/user";
import { notFound } from "next/navigation";
import { useState } from "react";
import { useSWRConfig } from "swr";

export default function user({ params }: { params: { id: number } }) {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: user, error, isLoading, url } = getUser(params.id, page, limit);

  const { mutate } = useSWRConfig();

  if (error) return notFound();
  if (isLoading) return <Loading />;

  return (
    user && (
      <User
        user={user}
        total={user._count.comments}
        limit={limit}
        pastPagesCount={2}
        futurePagesCount={4}
        refresh={() => mutate(url)}
        page={page}
        setPage={setPage}
      />
    )
  );
}
