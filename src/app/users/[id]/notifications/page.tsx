import Notifications from "@/components/screens/Notifications/page";
import Loading from "@/components/shared/Loading/page";
import {
  getUserNotifications,
  updateStatusUserNotification,
} from "@/services/userNotification";
import INotification from "@/types/notification.type";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function notifications({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const res: {
    notifications: INotification[];
    _count: {
      notifications: number;
    };
  } = await getUserNotifications(params.id, page, limit);

  const updateStatus = await updateStatusUserNotification(params.id);

  return (
    <Suspense fallback={<Loading />}>
      <Notifications
        notifications={res.notifications}
        total={res._count.notifications}
        pastPagesCount={2}
        futurePagesCount={4}
        limit={limit}
      />
    </Suspense>
  );
}
