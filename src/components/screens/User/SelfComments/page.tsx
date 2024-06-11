"use client";

import MarginBottom from "@/components/shared/MarginBottom/page";
import { IUserComment } from "@/types/userComment";
import Actions from "@/components/screens/User/Comments/Actions/page";
import EmptyList from "@/components/shared/EmptyList/page";
import { useTranslation } from "react-i18next";
import Pagination from "@/components/shared/Pagination/page";
import IPagination from "@/types/pagination.type";
import Thread from "./Thread/page";

interface ISelfComments extends IPagination {
  comments: IUserComment[];
}

export default function SelfComments(props: ISelfComments) {
  const { t } = useTranslation();

  return (
    <MarginBottom gap={10}>
      {props.comments.length > 0 ? (
        <MarginBottom gap={10}>
          {props.comments.map((comment: IUserComment) => {
            return (
              <Thread comment={comment}>
                <Actions comment={comment} />
              </Thread>
            );
          })}
        </MarginBottom>
      ) : (
        <EmptyList value={t("screens:comments:emptyList")} />
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
