"use client";

import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import Preview from "@/components/screens/User/Preview/page";
import About from "@/components/screens/User/About/page";
import SecondaryContent from "@/components/shared/Content/SideBar/SecondaryContent/page";
import MemberInfo from "@/components/shared/MemberInfo/page";
import IUser from "@/types/user.type";
import UserComments from "@/components/screens/User/Comments/page";
import { useTranslation } from "react-i18next";

interface User {
  id: number;
  limit: number;
  user: IUser;
}

export default function User(props: User) {
  const { t } = useTranslation();

  return (
    <Content>
      <SideBar>
        <Preview user={props.user} />
        <SecondaryContent
          title={t("screens:user:subscribers")}
          link="/"
          counter={props.user._count.subscribers}
        >
          {props.user.subscribers.length > 0
            ? props.user.subscribers.map(
                (subscriber: { subscriber: IUser }) => (
                  <MemberInfo
                    key={subscriber.subscriber.id}
                    member={subscriber.subscriber}
                    detail={subscriber.subscriber.role.name}
                  />
                )
              )
            : null}
        </SecondaryContent>
        <SecondaryContent
          title={t("screens:user:subscribed")}
          link="/"
          counter={props.user._count.subscribed}
        >
          {props.user.subscribed.length > 0
            ? props.user.subscribed.map((subscriber: { user: IUser }) => (
                <MemberInfo
                  key={subscriber.user.id}
                  member={subscriber.user}
                  detail={subscriber.user.role.name}
                />
              ))
            : null}
        </SecondaryContent>
      </SideBar>
      <Main>
        <About user={props.user} />
        <UserComments
          total={props.user._count.comments}
          limit={props.limit}
          pastPagesCount={2}
          futurePagesCount={4}
          userId={props.id}
          comments={props.user.comments}
        />
      </Main>
    </Content>
  );
}
