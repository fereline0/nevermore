"use client";

import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import styles from "./page.module.css";
import header from "./header";
import { useSession } from "next-auth/react";
import { ITab } from "@/types/tab.type";
import Notification from "./Notification/page";
import { getUserNotificationsCount } from "@/services/userNotification";
import AlightItems from "@/components/shared/AlightItems/page";
import Avatar from "@/components/shared/Avatar/page";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();

  const [stateVisibility, setStateVisibility] = useState(false);

  const { data: count } = getUserNotificationsCount(session?.user.id);

  function openWindow() {
    setStateVisibility(true);
  }

  function closeWindow() {
    setStateVisibility(false);
  }

  const cx = classNames.bind(styles);

  const overlay = cx({
    overlay: true,
    active: stateVisibility,
  });

  const menu = cx({
    menu: true,
    active: stateVisibility,
  });

  const menuItems = header();

  return (
    <>
      <div className={overlay} onClick={closeWindow} />
      <header className={styles.header}>
        <div className={styles.elements}>
          <IoMenu
            size="1.7em"
            className={styles.menuIcon}
            onClick={openWindow}
          />
          <Link href="/">
            <h2>Nevermore</h2>
          </Link>
          <div className={menu}>
            <nav className={styles.navigation}>
              {menuItems.map((element: ITab, index) => {
                return (
                  <Link key={index} href={element.link} onClick={closeWindow}>
                    {element.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <nav className={styles.navigation}>
            {status == "loading" ? (
              <span>{t("screens:header:loading")}</span>
            ) : status === "authenticated" ? (
              <AlightItems gap={20}>
                <Link href={`/users/${session.user?.id}/notifications`}>
                  <Notification count={count} />
                </Link>
                <Link href={`/users/${session.user?.id}`}>
                  <Avatar url={session.user.image} size={35} />
                </Link>
              </AlightItems>
            ) : (
              <Link href="/signIn">{t("signIn:value")}</Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
