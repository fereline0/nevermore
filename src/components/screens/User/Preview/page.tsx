"use client";

import MarginBottom from "@/components/shared/MarginBottom/page";
import Actions from "./Actions/page";
import Avatar from "./Avatar/page";
import styles from "./page.module.css";
import IUser from "@/types/user.type";
import Section from "@/components/shared/Content/Section/page";
import Role from "./Role/page";
import IRole from "@/types/role.type";

interface IPreview {
  user: IUser;
  roles: IRole[];
}

export default function Preview(props: IPreview) {
  return (
    <Section className={styles.preview} padding="10px">
      <MarginBottom gap={5}>
        <Avatar url={props.user.image} />
        <Role user={props.user} roles={props.roles} />
        <Actions user={props.user} />
      </MarginBottom>
    </Section>
  );
}
