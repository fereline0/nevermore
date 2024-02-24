import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import { getSections } from "@/services/forum";
import SubTab from "@/components/screens/SubTab/page";

interface IForum {
  children: React.ReactNode;
}

export default async function Forum(props: IForum) {
  const sections = await getSections();

  return (
    <Content>
      <SideBar>
        <SubTab sections={sections} />
      </SideBar>
      <Main>{props.children}</Main>
    </Content>
  );
}
