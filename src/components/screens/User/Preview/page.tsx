"use client";

import MarginBottom from "@/components/shared/MarginBottom/page";
import Actions from "./Actions/page";
import Avatar from "./Avatar/page";
import styles from "./page.module.css";
import IUser from "@/types/user.type";
import Section from "@/components/shared/Content/Section/page";

interface IPreview {
  user: IUser;
}

export default function Preview(props: IPreview) {
  return (
    <Section className={styles.preview} padding="10px">
      <MarginBottom gap={5}>
        <Avatar url={props.user.image} />
        <div className={styles.role}>
          <h3
            className={styles.role}
            style={{
              backgroundColor: `#${props.user.role.color}`,
            }}
          >
            {props.user.role.name}
          </h3>
        </div>
        <Actions user={props.user} />
      </MarginBottom>
    </Section>
  );
}
