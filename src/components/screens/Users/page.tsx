"use client";

import Main from "@/components/shared/Content/Main/page";
import SecondaryContent from "@/components/shared/Content/SideBar/SecondaryContent/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import Member from "@/components/shared/Member/page";
import MemberInfo from "@/components/shared/MemberInfo/page";
import Pagination from "@/components/shared/Pagination/page";
import Search from "@/components/shared/Search/page";
import IPagination from "@/types/pagination.type";
import IUser from "@/types/user.type";
import { currentLocale } from "@/utils/currentLocale";
import { formatDistance } from "date-fns";
import { useTranslation } from "react-i18next";

interface IUsers extends IPagination {
  newUsers: IUser[];
  users: IUser[];
  setSearchParams: any;
}

export default function Users(props: IUsers) {
  const { t } = useTranslation();

  const locale = currentLocale();

  return (
    <Content>
      <SideBar>
        <SecondaryContent title={t("screens:users:newUsers")}>
          {props.newUsers.map((user: IUser) => {
            return (
              <MemberInfo
                key={user.id}
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
        <Search
          setPage={props.setPage}
          setSearchParams={props.setSearchParams}
        />
        {props.users.map((user: IUser) => {
          return (
            <Member key={user.id} member={user} detail={t(user.role.name)} />
          );
        })}
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
