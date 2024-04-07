import IUser from "@/types/user.type";
import styles from "./page.module.css";
import PairsJustified from "@/components/shared/PairsJustified/page";
import { useTranslation } from "react-i18next";
import { formatISO9075 } from "date-fns";

interface IAboutUser {
  user: IUser;
}

export default function About(props: IAboutUser) {
  const { t } = useTranslation();
  const detailInformation = props.user.detailInformation;

  return (
    <div className={styles.aboutUser}>
      <div className={styles.general}>
        <h1 className={styles.username}>{props.user.name}</h1>
        <p>{props.user.detailInformation?.aboutMe}</p>
      </div>
      {detailInformation && (
        <PairsJustified
          data={[
            {
              label: t("screens:user:about:detailInformation:occupation"),
              value: detailInformation.occupation,
            },
            {
              label: t("screens:user:about:detailInformation:interests"),
              value: detailInformation.interests,
            },
            {
              label: t("screens:user:about:detailInformation:gender"),
              value: detailInformation.gender,
            },
            {
              label: t("screens:user:about:detailInformation:bithday"),
              value: formatISO9075(detailInformation.bithday),
            },
          ]}
        />
      )}
    </div>
  );
}
