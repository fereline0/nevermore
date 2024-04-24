import INotification from "@/types/notification.type";
import Notification from "./Notification/page";
import MarginBottom from "@/components/shared/MarginBottom/page";
import Content from "@/components/shared/Content/page";
import Main from "@/components/shared/Content/Main/page";

interface INotifications {
  notifications: INotification[];
}

export default function Notifications(props: INotifications) {
  return (
    <Content>
      <Main>
        <MarginBottom gap={10}>
          {props.notifications.map((notification: INotification) => {
            return <Notification notification={notification} />;
          })}
        </MarginBottom>
      </Main>
    </Content>
  );
}
