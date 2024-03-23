"use client";

import Actions from "./Actions/page";
import Avatar from "./Avatar/page";
import styles from "./page.module.css";
import IUser from "@/types/user.type";

interface IPreview {
  user: IUser;
}

export default function Preview(props: IPreview) {
  return (
    <div className={styles.preview}>
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
    </div>
  );
}
