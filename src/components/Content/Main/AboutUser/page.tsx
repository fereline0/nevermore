import styles from "./page.module.css";
import PairsJustified from "@/components/PairsJustified/page";

interface IAboutUser {
  user: any;
}

export default function AboutUser(props: IAboutUser) {
  return (
    <div className={styles.aboutUser}>
      <div className={styles.general}>
        <h1 className={styles.username}>{props.user.name}</h1>
        <p>{props.user.detailInformation?.aboutMe}</p>
      </div>
      {(() => {
        const detailInformation = props.user.detailInformation;

        if (detailInformation) {
          const { id, aboutMe, userId, user, ...detailsToPairs } =
            detailInformation;

          return <PairsJustified data={detailsToPairs} />;
        }
      })()}
    </div>
  );
}
