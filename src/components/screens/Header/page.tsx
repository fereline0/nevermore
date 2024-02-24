"use client";

import { IoMenu } from "react-icons/io5";
import { useState } from "react";
const classNames = require("classnames/bind");
import Link from "next/link";
import styles from "./page.module.css";
import header from "./header";
import IHeader from "@/types/header.type";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  const [stateVisibility, setStateVisibility] = useState(false);

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

  return (
    <>
      <div className={overlay} onClick={closeWindow} />
      <header className={styles.header}>
        <div className={styles.elements}>
          <IoMenu className={styles.menu} onClick={openWindow} />
          <div className={styles.logo}>
            <Link href="/">
              <h2>Nevermore</h2>
            </Link>
          </div>
          <nav className={navigation}>
            <ul>
              {header.map((element: IHeader) => {
                return (
                  <li className={styles.link}>
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
                <li className={styles.link}>
                  <Link href={`/users/${session.user?.id}`}>
                    {session.user?.name}
                  </Link>
                </li>
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
