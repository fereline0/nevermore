"use client";

import Section from "@/components/shared/Content/Section/page";
import EmptyList from "@/components/shared/EmptyList/page";
import MarginBottom from "@/components/shared/MarginBottom/page";
import Member from "@/components/shared/Member/page";
import Pagination from "@/components/shared/Pagination/page";
import Search from "@/components/shared/Search/page";
import IPagination from "@/types/pagination.type";
import IUser from "@/types/user.type";
import { useTranslation } from "react-i18next";

interface ISubscribers extends IPagination {
  subscribers: { subscriber: IUser }[];
}

export default function Subscribers(props: ISubscribers) {
  const { t } = useTranslation();

  return (
    <MarginBottom gap={10}>
      <Search />
      {props.subscribers.length > 0 ? (
        props.subscribers.map((subscriber: { subscriber: IUser }) => {
          return (
            <Section key={subscriber.subscriber.id} padding="10px 10px">
              <Member
                member={subscriber.subscriber}
                detail={t(subscriber.subscriber.role.name)}
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
    </MarginBottom>
  );
}
