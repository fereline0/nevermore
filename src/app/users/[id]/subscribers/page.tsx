"use client";

import Main from "@/components/shared/Content/Main/page";
import Section from "@/components/shared/Content/Section/page";
import Content from "@/components/shared/Content/page";
import EmptyList from "@/components/shared/EmptyList/page";
import Loading from "@/components/shared/Loading/page";
import Member from "@/components/shared/Member/page";
import Pagination from "@/components/shared/Pagination/page";
import { getUserSubscribers } from "@/services/userSubscribers";
import IUser from "@/types/user.type";
import { notFound } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function subscribers({ params }: { params: { id: number } }) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, error, isLoading } = getUserSubscribers(params.id, page, limit);

  if (error) return notFound();

  if (isLoading) return <Loading />;

  return (
    data && (
      <Content>
        <Main>
          {data.subscribers.length > 0 ? (
            data.subscribers.map((user: { subscriber: IUser }) => {
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
            total={data._count.subscribers}
            limit={limit}
            pastPagesCount={2}
            futurePagesCount={4}
            page={page}
            setPage={setPage}
          />
        </Main>
      </Content>
    )
  );
}
