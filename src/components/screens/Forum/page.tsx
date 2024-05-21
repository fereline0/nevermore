"use client";

import styles from "./page.module.css";
import Articles from "@/components/screens/Forums/Articles/page";
import Search from "@/components/shared/Search/page";
import Button from "@/components/UI/Button/page";
import FitContent from "@/components/shared/FitContent/page";
import IPagination from "@/types/pagination.type";
import ICategory from "@/types/category.type";
import Main from "@/components/shared/Content/Main/page";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface IForum extends IPagination {
  category: ICategory;
}

export default function Forum(props: IForum) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Main>
      <h1>{props.category.name}</h1>
      <Search />
      <div className={styles.actions}>
        <FitContent>
          <Button
            value={t("screens:forum:createArticle")}
            onClick={() => router.push(`${props.category.id}/createArticle`)}
          />
        </FitContent>
        <FitContent>
          <Button
            value={t("screens:forum:moderate")}
            onClick={() => router.push("")}
          />
        </FitContent>
      </div>
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
