"use client";

import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
const classNames = require("classnames/bind");
import Link from "next/link";
import styles from "./page.module.css";
import header from "./header";
import { useSession } from "next-auth/react";
import { ITab } from "@/types/tab.type";
import Notification from "./Notification/page";
import { getUserNotifications } from "@/services/userNotification";
import AlightItems from "@/components/shared/AlightItems/page";

export default function Header() {
  const { data: session, status } = useSession();

  const [stateVisibility, setStateVisibility] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status == "authenticated") {
          const res = await getUserNotifications(session.user?.id);
          setNotificationCount(res._count.notifications);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [status, session]);

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

  const navigation = cx({
    navigation: true,
    active: stateVisibility,
  });

  const menuItems = header();

  return (
    <>
      <div className={overlay} onClick={closeWindow} />
      <header className={styles.header}>
        <div className={styles.elements}>
          <IoMenu size="1.7em" className={styles.menu} onClick={openWindow} />
          <Link href="/">
            <h2>Nevermore</h2>
          </Link>
          <nav className={navigation}>
            <ul>
              {menuItems.map((element: ITab, index) => {
                return (
                  <li key={index} className={styles.link}>
                    <Link href={element.link} onClick={closeWindow}>
                      {element.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <nav>
            <ul>
              {status == "authenticated" ? (
                <AlightItems>
                  <li className={styles.link}>
                    <Link href={`/users/${session.user?.id}/notifications`}>
                      <Notification count={notificationCount} />
                    </Link>
                  </li>
                  <li className={styles.link}>
                    <Link href={`/users/${session.user?.id}`}>
                      {session.user.name}
                    </Link>
                  </li>
                </AlightItems>
              ) : (
                <li className={styles.link}>
                  <Link href="/signIn">Sign in</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
