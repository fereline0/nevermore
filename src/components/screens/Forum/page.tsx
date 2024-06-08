"use client";

import styles from "./page.module.css";
import Articles from "@/components/screens/Articles/page";
import Search from "@/components/shared/Search/page";
import Button from "@/components/UI/Button/page";
import FitContent from "@/components/shared/FitContent/page";
import IPagination from "@/types/pagination.type";
import ICategory from "@/types/category.type";
import Main from "@/components/shared/Content/Main/page";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import Member from "@/components/shared/Member/page";
import IUser from "@/types/user.type";
import SecondaryContent from "@/components/shared/Content/SecondaryContent/page";

interface IForum extends IPagination {
  category: ICategory;
}

export default function Forum(props: IForum) {
  const { t } = useTranslation();
  const router = useRouter();
  const { status } = useSession();

  return (
    <Main>
      <h1>{props.category.name}</h1>
      <Search />
      {status == "authenticated" && (
        <div className={styles.actions}>
          <FitContent>
            <Button
              value={t("screens:forum:actions:createArticle")}
              onClick={() => router.push(`${props.category.id}/createArticle`)}
            />
          </FitContent>
          <FitContent>
            <Button
              value={t("screens:forum:actions:moderate")}
              onClick={() => router.push("")}
            />
          </FitContent>
        </div>
      )}
      <SecondaryContent title={t("screens:forum:supervisors")}>
        {props.category.supervisors.length > 0
          ? props.category.supervisors.map((user: IUser) => (
              <Member key={user.id} member={user} detail={user.role.name} />
            ))
          : null}
      </SecondaryContent>
      <Articles
        articles={props.category.articles}
        total={props.total}
        limit={props.limit}
        pastPagesCount={props.pastPagesCount}
        futurePagesCount={props.futurePagesCount}
      />
    </Main>
  );
}
