import Tab from "@/components/screens/SubTab/Tab/page";
import Main from "@/components/shared/Content/Main/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import edit from "./edit";
import { toSentenceCase } from "@/utils/caseConverter";

export const dynamic = "force-dynamic";

interface IEdit {
  children: React.ReactNode;
}

export default async function Edit(props: IEdit) {
  return (
    <Content>
      <SideBar>
        <ul>
          {edit.map((element: any) => {
            return (
              <Tab
                name={toSentenceCase(element.slug)}
                link={`/users/edit/${element.slug}`}
              />
            );
          })}
        </ul>
      </SideBar>
      <Main>{props.children}</Main>
    </Content>
  );
}
