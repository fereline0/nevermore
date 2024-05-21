"use client";

import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Sectionlist from "@/components/screens/Forums/SectionList/page";
import SecondaryContent from "@/components/shared/Content/SecondaryContent/page";
import PairsJustified from "@/components/shared/PairsJustified/page";
import { useTranslation } from "react-i18next";
import ISection from "@/types/section.type";

interface IForums {
  res: {
    sections: ISection[];
    count: { articles: number; comments: number };
  };
  children: React.ReactNode;
}

export default function Forums(props: IForums) {
  const { t } = useTranslation();

  return (
    <Content>
      <SideBar>
        <Sectionlist data={props.res.sections} />
        <SecondaryContent title={t("screens:forums:statistics:title")}>
          <PairsJustified
            data={[
              {
                label: t("screens:forums:statistics:data:articlesCount"),
                value: props.res.count.articles,
              },
              {
                label: t("screens:forums:statistics:data:commentsCount"),
                value: props.res.count.comments,
              },
            ]}
          />
        </SecondaryContent>
      </SideBar>
      {props.children}
    </Content>
  );
}
