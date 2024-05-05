"use client";

import MarginBottom from "@/components/shared/MarginBottom/page";
import Actions from "./Actions/page";
import Avatar from "./Avatar/page";
import styles from "./page.module.css";
import IUser from "@/types/user.type";
import Section from "@/components/shared/Content/Section/page";
import Role from "./Role/page";

interface IPreview {
  user: IUser;
  refresh: () => void;
}

export default function Preview(props: IPreview) {
  return (
    <Section className={styles.preview} padding="10px">
      <MarginBottom gap={5}>
        <Avatar url={props.user.image} />
        <Role user={props.user} refresh={props.refresh} />
        <Actions user={props.user} />
      </MarginBottom>
    </Section>
  );
}
