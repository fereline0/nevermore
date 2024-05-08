"use client";

import Main from "@/components/shared/Content/Main/page";
import Section from "@/components/shared/Content/Section/page";
import Content from "@/components/shared/Content/page";
import EmptyList from "@/components/shared/EmptyList/page";
import Member from "@/components/shared/Member/page";
import Pagination from "@/components/shared/Pagination/page";
import IPagination from "@/types/pagination.type";
import IUser from "@/types/user.type";
import { useTranslation } from "react-i18next";

interface ISubscribed extends IPagination {
  subscribed: { user: IUser }[];
}

export default function Subscribed(props: ISubscribed) {
  const { t } = useTranslation();

  return (
    <Content>
      <Main>
        {props.subscribed.length > 0 ? (
          props.subscribed.map((subscribed: { user: IUser }) => {
            return (
              <Section key={subscribed.user.id} padding="10px 10px">
                <Member
                  member={subscribed.user}
                  detail={t(subscribed.user.role.name)}
                />
              </Section>
            );
          })
        ) : (
          <EmptyList value={t("screens:user:subscribed:emptyList")} />
        )}
        <Pagination
          total={props.total}
          limit={props.limit}
          pastPagesCount={props.pastPagesCount}
          futurePagesCount={props.futurePagesCount}
        />
      </Main>
    </Content>
  );
}
