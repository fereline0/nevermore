"use client";

import { IoMdMore } from "react-icons/io";
import styles from "./page.module.css";
import Dropdown from "@/components/shared/Dropdown/page";
import Item from "@/components/shared/Dropdown/Item/page";
import DangerItem from "@/components/shared/Dropdown/DangerItem/page";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Separated from "@/components/shared/Dropdown/Separated/page";
import IArticle from "@/types/article.type";
import { pageBelong, roleBenefits, userCan } from "@/policies/user";
import { useSession } from "next-auth/react";
import { deleteArticle } from "@/services/article";
import { useRouter } from "next/navigation";
import { userIsSupervisor } from "@/policies/article";

interface IActions {
  article: IArticle;
}

export default function Actions(props: IActions) {
  const { t } = useTranslation();
  const actionsRef = useRef(null);
  const [visibility, setVisibility] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const canDelete =
    pageBelong(props.article.author.id, session?.user.id) ||
    ((userCan(session?.user.role.abilities, "superviseForum") ||
      userIsSupervisor(props.article.category.supervisors, session?.user.id)) &&
      roleBenefits(props.article.author.role.id, session?.user.role.id));

  return (
    <div ref={actionsRef}>
      <IoMdMore
        className={styles.icon}
        onClick={() => setVisibility(!visibility)}
      />
      <Dropdown
        right={true}
        parentRef={actionsRef}
        visibility={visibility}
        setVisibility={setVisibility}
      >
        <Separated>
          {canDelete && (
            <DangerItem
              value={t("screens:comments:actions:delete:value")}
              description={t("screens:comments:actions:delete:description")}
              func={async () =>
                await deleteArticle(props.article.id).then(router.refresh)
              }
            />
          )}
        </Separated>
      </Dropdown>
    </div>
  );
}
