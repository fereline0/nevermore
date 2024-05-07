"use client";

import classNames from "classnames/bind";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import { ITab } from "@/types/tab.type";

export default function Tab(props: ITab) {
  const path = usePathname();

  const cx = classNames.bind(styles);

  const className = cx({
    tab: true,
    active: path == props.link,
  });

  return (
    <Link className={className} href={props.link}>
      {props.name}
    </Link>
  );
}
