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
import IPagination from "@/types/pagination.type";
import AlertAboutBan from "./AlertAboutBan/page";

interface User extends IPagination {
  user: IUser;
}

export default function User(props: User) {
  const { t } = useTranslation();

  const ban = props.user.bans.find(
    (ban) => new Date(ban.expires) > new Date() && ban.activity
  );

  return (
    <Content>
      <SideBar>
        <Preview user={props.user} ban={ban} />
        <SecondaryContent
          title={t("screens:user:subscribers:value")}
          link={`/users/${props.user.id}/subscribers`}
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
          title={t("screens:user:subscribed:value")}
          link={`/users/${props.user.id}/subscribed`}
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
        {ban && <AlertAboutBan ban={ban} />}
        <UserComments
          userId={props.user.id}
          comments={props.user.comments}
          total={props.total}
          limit={props.limit}
          pastPagesCount={props.pastPagesCount}
          futurePagesCount={props.futurePagesCount}
        />
      </Main>
    </Content>
  );
}
