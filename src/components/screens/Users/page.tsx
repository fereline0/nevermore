"use client";

import styles from "./page.module.css";
import Main from "@/components/shared/Content/Main/page";
import Section from "@/components/shared/Content/Section/page";
import SecondaryContent from "@/components/shared/Content/SecondaryContent/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import Member from "@/components/shared/Member/page";
import Pagination from "@/components/shared/Pagination/page";
import Search from "@/components/shared/Search/page";
import IPagination from "@/types/pagination.type";
import IUser from "@/types/user.type";
import { currentLocale } from "@/utils/currentLocale";
import { formatDistance } from "date-fns";
import { useTranslation } from "react-i18next";
import Counter from "@/components/shared/Counter/page";
import { BiCommentDetail } from "react-icons/bi";
import { TbArticle } from "react-icons/tb";

interface IUsers extends IPagination {
  newUsers: IUser[];
  users: IUser[];
}

export default function Users(props: IUsers) {
  const { t } = useTranslation();

  const locale = currentLocale();

  return (
    <Content>
      <SideBar>
        <SecondaryContent title={t("screens:users:newUsers")}>
          {props.newUsers?.map((user: IUser) => {
            return (
              <Member
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
        <Search />
        {props.users?.map((user: IUser) => {
          const commentsCount =
            user._count.writerComments + user._count.writerArticleComments;

          return (
            <Section key={user.id} padding="10px 10px">
              <Member member={user} detail={user.role.name}>
                <div className={styles.counters}>
                  <Counter count={commentsCount}>
                    <BiCommentDetail />
                  </Counter>
                  <Counter count={user._count.articles}>
                    <TbArticle />
                  </Counter>
                </div>
              </Member>
            </Section>
          );
        })}
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
