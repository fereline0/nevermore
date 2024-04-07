"use client";

import Tab from "@/components/shared/Tab/page";
import Main from "@/components/shared/Content/Main/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import edit from "@/app/users/edit/edit";
import { ITab } from "@/types/tab.type";

interface IEdit {
  children: React.ReactNode;
}

export default function Edit(props: IEdit) {
  const menuItems = edit();

  return (
    <Content>
      <SideBar>
        <ul>
          {menuItems.map((element: ITab, index) => {
            return (
              <Tab
                key={index}
                name={element.name}
                link={`/users/edit/${element.link}`}
              />
            );
          })}
        </ul>
      </SideBar>
      <Main>{props.children}</Main>
    </Content>
  );
}
