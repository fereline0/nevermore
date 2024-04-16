"use client";

import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import Sectionlist from "@/components/screens/Forums/SectionList/page";
import SecondaryContent from "@/components/shared/Content/SideBar/SecondaryContent/page";
import PairsJustified from "@/components/shared/PairsJustified/page";
import { useTranslation } from "react-i18next";
import ISection from "@/types/section.type";
import MarginBottom from "@/components/shared/MarginBottom/page";

interface IForum {
  res: {
    sections: ISection[];
    count: { articles: number; comments: number };
  };
  children: React.ReactNode;
}

export default function Forum(props: IForum) {
  const { t } = useTranslation();

  return (
    <Content>
      <SideBar>
        <Sectionlist data={props.res.sections} />
        <SecondaryContent title={t("screens:forum:statistics:title")} link="">
          <PairsJustified
            data={[
              {
                label: t("screens:forum:statistics:data:articlesCount"),
                value: props.res.count.articles,
              },
              {
                label: t("screens:forum:statistics:data:commentsCount"),
                value: props.res.count.comments,
              },
            ]}
          />
        </SecondaryContent>
      </SideBar>
      <Main>{props.children}</Main>
    </Content>
  );
}
