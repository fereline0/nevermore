"use client";

import Tab from "@/components/shared/Tab/page";
import Main from "@/components/shared/Content/Main/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import edit from "./edit";
import { ITab } from "@/types/tab.type";
import MarginBottom from "@/components/shared/MarginBottom/page";
import IUser from "@/types/user.type";
import { pageBelong, roleBenefits, userCan } from "@/policies/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/Loading/page";

interface IEdit {
  user: IUser;
  children: React.ReactNode;
}

export default function Edit(props: IEdit) {
  const menuItems = edit();
  const { data: session, status } = useSession({
    required: true,
  });
  const router = useRouter();

  const canEdit = userCan(session?.user?.role?.abilities, "editUser");
  const belongsToUser = pageBelong(props.user.id, session?.user.id);
  const userRoleBenefits = roleBenefits(
    props.user.role.id,
    session?.user.role.id
  );

  useEffect(() => {
    if (
      !(belongsToUser || (canEdit && userRoleBenefits)) &&
      status == "authenticated"
    ) {
      router.push(`/users/${session.user.id}/edit/general`);
    }
  }, [belongsToUser, userRoleBenefits, canEdit, router, session, status]);

  if (!(belongsToUser || (canEdit && userRoleBenefits))) {
    return <Loading />;
  }

  return (
    <Content>
      <SideBar>
        <MarginBottom gap={5}>
          {menuItems.map((element: ITab, index) => {
            return (
              <Tab
                key={index}
                name={element.name}
                link={`/users/${props.user.id}/edit/${element.link}`}
              />
            );
          })}
        </MarginBottom>
      </SideBar>
      <Main>{props.children}</Main>
    </Content>
  );
}
