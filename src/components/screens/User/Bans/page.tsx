"use client";

import Ban from "@/components/shared/Ban/page";
import Section from "@/components/shared/Content/Section/page";
import EmptyList from "@/components/shared/EmptyList/page";
import MarginBottom from "@/components/shared/MarginBottom/page";
import Pagination from "@/components/shared/Pagination/page";
import IBan from "@/types/ban.type";
import IPagination from "@/types/pagination.type";
import { useTranslation } from "react-i18next";

interface IBans extends IPagination {
  bans: IBan[];
}

export default function Bans(props: IBans) {
  const { t } = useTranslation();

  return (
    <MarginBottom gap={10}>
      {props.bans.length > 0 ? (
        <MarginBottom gap={10}>
          {props.bans.map((ban: IBan, index) => {
            return (
              <Section key={index} padding="5px 10px">
                <Ban ban={ban} />
              </Section>
            );
          })}
        </MarginBottom>
      ) : (
        <EmptyList value={t("screens:user:bans:emptyList")} />
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
