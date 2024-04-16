"use client";

import Tab from "@/components/shared/Tab/page";
import Main from "@/components/shared/Content/Main/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import edit from "./edit";
import { ITab } from "@/types/tab.type";
import MarginBottom from "@/components/shared/MarginBottom/page";

interface IEdit {
  id: number;
  children: React.ReactNode;
}

export default function Edit(props: IEdit) {
  const menuItems = edit();

  return (
    <Content>
      <SideBar>
        <MarginBottom gap={5}>
          {menuItems.map((element: ITab, index) => {
            return (
              <Tab
                key={index}
                name={element.name}
                link={`/users/${props.id}/edit/${element.link}`}
              />
            );
          })}
        </MarginBottom>
      </SideBar>
      <Main>{props.children}</Main>
    </Content>
  );
}
