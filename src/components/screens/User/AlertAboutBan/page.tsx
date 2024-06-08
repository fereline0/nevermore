import AlertSection from "@/components/shared/Content/AlertSection/page";
import MarginBottom from "@/components/shared/MarginBottom/page";
import PairsJustified from "@/components/shared/PairsJustified/page";
import IBan from "@/types/ban.type";
import { currentLocale } from "@/utils/currentLocale";
import { formatDistance } from "date-fns";
import { useTranslation } from "react-i18next";

interface IAlertAboutBan {
  ban: IBan;
}

export default function AlertAboutBan(props: IAlertAboutBan) {
  const { t } = useTranslation();

  const locale = currentLocale();

  return (
    <AlertSection padding="5px 10px">
      <MarginBottom gap={10}>
        <p>{t("screens:user:alertAboutBan")}</p>
        <PairsJustified
          data={[
            {
              label: t("shared:ban:initiator"),
              link: `/users/${props.ban.initiator.id}`,
              value: props.ban.initiator.name,
            },
            {
              label: t("shared:ban:reason"),
              value: props.ban.reason,
            },
            {
              label: t("shared:ban:expires"),
              value: formatDistance(props.ban.expires, new Date(), {
                includeSeconds: true,
                addSuffix: true,
                locale,
              }),
            },
          ]}
        />
      </MarginBottom>
    </AlertSection>
  );
}
