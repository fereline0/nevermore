"use client";

import INotification from "@/types/notification.type";
import Notification from "./Notification/page";
import IPagination from "@/types/pagination.type";
import Pagination from "@/components/shared/Pagination/page";
import EmptyList from "@/components/shared/EmptyList/page";
import { useTranslation } from "react-i18next";
import MarginBottom from "@/components/shared/MarginBottom/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { pageBelong } from "@/policies/user";
import Loading from "@/components/shared/Loading/page";

interface INotifications extends IPagination {
  id: number;
  notifications: INotification[];
}

export default function Notifications(props: INotifications) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
  });

  const canReadNotifications = pageBelong(props.id, session?.user.id);

  useEffect(() => {
    if (!canReadNotifications && status == "authenticated") {
      router.push(`/users/${session.user.id}/notifications`);
    }
  }, [status, canReadNotifications, router, session]);

  if (!canReadNotifications) {
    return <Loading />;
  }

  return (
    <MarginBottom gap={10}>
      {props.notifications.length > 0 ? (
        props.notifications.map((notification: INotification) => {
          return (
            <Notification key={notification.id} notification={notification} />
          );
        })
      ) : (
        <EmptyList value={t("screens:notifications:emptyList")} />
      )}
      <Pagination
        total={props.total}
        limit={props.limit}
        pastPagesCount={props.pastPagesCount}
        futurePagesCount={props.futurePagesCount}
      />
    </MarginBottom>
  );
}
