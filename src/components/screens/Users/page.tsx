"use client";

import Main from "@/components/shared/Content/Main/page";
import SecondaryContent from "@/components/shared/Content/SideBar/SecondaryContent/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import Member from "@/components/shared/Member/page";
import MemberInfo from "@/components/shared/MemberInfo/page";
import Pagination from "@/components/shared/Pagination/page";
import Search from "@/components/shared/Search/page";
import IUser from "@/types/user.type";
import { currentLocale } from "@/utils/currentLocale";
import { formatDistance } from "date-fns";
import { useTranslation } from "react-i18next";

interface IUsers {
  res: { newUsers: IUser[]; users: IUser[]; count: number };
  limit: number;
}

export default function Users(props: IUsers) {
  const { t } = useTranslation();

  const locale = currentLocale();

  return (
    <Content>
      <SideBar>
        <SecondaryContent title={t("screens:users:newUsers")} link="">
          {props.res.newUsers.map((user: IUser) => {
            return (
              <MemberInfo
                member={user}
                detail={formatDistance(user.createdAt, new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                  locale,
                })}
              />
            );
          })}
        </SecondaryContent>
      </SideBar>
      <Main>
        <Search />
        {props.res.users.map((user: IUser) => {
          return <Member member={user} detail={user.role.name} />;
        })}
        <Pagination
          total={props.res.count}
          limit={props.limit}
          pastPagesCount={2}
          futurePagesCount={4}
        />
      </Main>
    </Content>
  );
}
