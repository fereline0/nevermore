import Notifications from "@/components/screens/Notifications/page";
import {
  getUserNotifications,
  updateStatusUserNotification,
} from "@/services/userNotification";
import INotification from "@/types/notification.type";

export const dynamic = "force-dynamic";

export default async function notifications({
  params,
}: {
  params: { id: number };
}) {
  const res: {
    notifications: INotification[];
    _count: {
      notifications: number;
    };
  } = await getUserNotifications(params.id);

  const updateStatus = await updateStatusUserNotification(params.id);

  return <Notifications notifications={res.notifications} />;
}
