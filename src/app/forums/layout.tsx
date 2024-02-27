import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import { getSections } from "@/services/forum";
import SubTab from "@/components/screens/SubTab/page";
import SecondaryContent from "@/components/shared/Content/SideBar/SecondaryContent/page";
import ISection from "@/types/section.type";
import PairsJustified from "@/components/shared/PairsJustified/page";

interface IForum {
  children: React.ReactNode;
}

export default async function Forum(props: IForum) {
  const res: {
    sections: ISection[];
    count: { articlesCount: number; commentsCount: number };
  } = await getSections();

  return (
    <Content>
      <SideBar>
        <SubTab sections={res.sections} />
        <SecondaryContent title="Forum statistics" link="">
          <PairsJustified data={res.count} />
        </SecondaryContent>
      </SideBar>
      <Main>{props.children}</Main>
    </Content>
  );
}
