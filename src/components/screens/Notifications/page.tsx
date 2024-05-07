"use client";

import INotification from "@/types/notification.type";
import Notification from "./Notification/page";
import Content from "@/components/shared/Content/page";
import Main from "@/components/shared/Content/Main/page";
import IPagination from "@/types/pagination.type";
import Pagination from "@/components/shared/Pagination/page";
import EmptyList from "@/components/shared/EmptyList/page";
import { useTranslation } from "react-i18next";

interface INotifications extends IPagination {
  notifications: INotification[];
}

export default function Notifications(props: INotifications) {
  const { t } = useTranslation();

  return (
    <Content>
      <Main>
        {props.notifications.length > 0 ? (
          props.notifications.map((notification: INotification) => {
            return <Notification notification={notification} />;
          })
        ) : (
          <EmptyList value={t("screens:notifications:emptyList")} />
        )}
        <Pagination
          total={props.total}
          limit={props.limit}
          page={props.page}
          setPage={props.setPage}
          pastPagesCount={props.pastPagesCount}
          futurePagesCount={props.futurePagesCount}
        />
      </Main>
    </Content>
  );
}
