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

interface ISubscribed extends IPagination {
  subscribed: { user: IUser }[];
}

export default function Subscribed(props: ISubscribed) {
  const { t } = useTranslation();

  return (
    <MarginBottom gap={10}>
      <Search />
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
    </MarginBottom>
  );
}
