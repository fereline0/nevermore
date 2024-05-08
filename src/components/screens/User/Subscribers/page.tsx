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

interface ISubscribers extends IPagination {
  subscribers: { subscriber: IUser }[];
}

export default function Subscribers(props: ISubscribers) {
  const { t } = useTranslation();

  return (
    <Content>
      <Main>
        {props.subscribers.length > 0 ? (
          props.subscribers.map((user: { subscriber: IUser }) => {
            return (
              <Section key={user.subscriber.id} padding="10px 10px">
                <Member
                  member={user.subscriber}
                  detail={t(user.subscriber.role.name)}
                />
              </Section>
            );
          })
        ) : (
          <EmptyList value={t("screens:user:subscribers:emptyList")} />
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
