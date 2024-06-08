"use client";

import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import Preview from "@/components/screens/User/Preview/page";
import About from "@/components/screens/User/About/page";
import SecondaryContent from "@/components/shared/Content/SecondaryContent/page";
import Member from "@/components/shared/Member/page";
import IUser from "@/types/user.type";
import { useTranslation } from "react-i18next";
import AlertAboutBan from "./AlertAboutBan/page";
import Roll from "@/components/shared/Roll/page";
import { ITab } from "@/types/tab.type";
import Tab from "@/components/shared/Tab/page";

interface User {
  user: IUser;
  children: React.ReactNode;
}

export default function User(props: User) {
  const { t } = useTranslation();

  const tabs = [
    {
      name: t("screens:user:comments"),
      link: `/users/${props.user.id}`,
    },
    {
      name: t("screens:user:articles"),
      link: `/users/${props.user.id}/articles`,
    },
    {
      name: t("screens:user:bans:value"),
      link: `/users/${props.user.id}/bans`,
    },
  ];

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
                  <Member
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
                <Member
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
        <Roll>
          {tabs.map((tab: ITab, index) => {
            return <Tab key={index} name={tab.name} link={tab.link} />;
          })}
        </Roll>
        {props.children}
      </Main>
    </Content>
  );
}
