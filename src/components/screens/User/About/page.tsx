import IUser from "@/types/user.type";
import PairsJustified from "@/components/shared/PairsJustified/page";
import { useTranslation } from "react-i18next";
import { formatISO9075, isValid } from "date-fns";
import Section from "@/components/shared/Content/Section/page";

interface IAboutUser {
  user: IUser;
}

export default function About(props: IAboutUser) {
  const { t } = useTranslation();
  const detailInformation = props.user.detailInformation;

  return (
    <Section padding="5px 10px">
      <div>
        <h1>{props.user.name}</h1>
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
              value: detailInformation.bithday
                ? formatISO9075(detailInformation.bithday)
                : null,
            },
          ]}
        />
      )}
    </Section>
  );
}
