"use client";

import Tab from "@/components/shared/Tab/page";
import Main from "@/components/shared/Content/Main/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import { ITab } from "@/types/tab.type";
import MarginBottom from "@/components/shared/MarginBottom/page";
import IUser from "@/types/user.type";
import { pageBelong, roleBenefits, userCan } from "@/policies/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/Loading/page";
import { useTranslation } from "react-i18next";

interface IEdit {
  user: IUser;
  children: React.ReactNode;
}

export default function Edit(props: IEdit) {
  const { t } = useTranslation();
  const { data: session, status } = useSession({
    required: true,
  });

  const router = useRouter();

  const tabs = [
    {
      name: t("screens:users:edit:general:title"),
      link: "general",
    },
    {
      name: t("screens:users:edit:security"),
      link: "security",
    },
    {
      name: t("screens:users:edit:detailInformation"),
      link: "detailInformation",
    },
  ];

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
          {tabs.map((tab: ITab, index) => {
            return (
              <Tab
                key={index}
                name={tab.name}
                link={`/users/${props.user.id}/edit/${tab.link}`}
              />
            );
          })}
        </MarginBottom>
      </SideBar>
      <Main>{props.children}</Main>
    </Content>
  );
}
