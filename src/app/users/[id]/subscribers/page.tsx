"use client";

import Button from "@/components/UI/Button/page";
import Main from "@/components/shared/Content/Main/page";
import Section from "@/components/shared/Content/Section/page";
import Content from "@/components/shared/Content/page";
import FitContent from "@/components/shared/FitContent/page";
import Loading from "@/components/shared/Loading/page";
import MemberInfo from "@/components/shared/MemberInfo/page";
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
          {data?.subscribers.map((user: { subscriber: IUser }) => {
            return (
              <Section key={user.subscriber.id} padding="10px 10px">
                <MemberInfo
                  member={user.subscriber}
                  detail={t(user.subscriber.role.name)}
                >
                  <FitContent>
                    <Button value="Hello" />
                  </FitContent>
                </MemberInfo>
              </Section>
            );
          })}
        </Main>
      </Content>
    )
  );
}
