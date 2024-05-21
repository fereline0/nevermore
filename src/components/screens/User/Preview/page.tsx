"use client";

import MarginBottom from "@/components/shared/MarginBottom/page";
import Actions from "./Actions/page";
import Avatar from "./Avatar/page";
import styles from "./page.module.css";
import IUser from "@/types/user.type";
import Section from "@/components/shared/Content/Section/page";
import Role from "./Role/page";
import IBan from "@/types/ban.type";

interface IPreview {
  user: IUser;
  ban?: IBan;
}

export default function Preview(props: IPreview) {
  return (
    <Section className={styles.preview} padding="10px">
      <MarginBottom gap={5}>
        <Avatar url={props.user.image} />
        <Role user={props.user} />
        <Actions user={props.user} ban={props.ban} />
      </MarginBottom>
    </Section>
  );
}
