"use client";

import Notifications from "@/components/screens/Notifications/page";
import Loading from "@/components/shared/Loading/page";
import {
  getUserNotifications,
  updateStatusUserNotification,
} from "@/services/userNotification";
import { notFound } from "next/navigation";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function notifications({ params }: { params: { id: number } }) {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, error, isLoading } = getUserNotifications(
    params.id,
    page,
    limit
  );

  if (isLoading) return <Loading />;

  if (error) return notFound();

  updateStatusUserNotification(params.id);

  return (
    data && (
      <Notifications
        notifications={data.notifications}
        total={data._count.notifications}
        pastPagesCount={2}
        futurePagesCount={4}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    )
  );
}
