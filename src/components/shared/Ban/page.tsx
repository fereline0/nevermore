"use client";

import PairsJustified from "@/components/shared/PairsJustified/page";
import IBan from "@/types/ban.type";
import { formatISO9075 } from "date-fns";
import { useTranslation } from "react-i18next";

interface Ban {
  ban: IBan;
}

export default function Ban(props: Ban) {
  const { t } = useTranslation();

  return (
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
          label: t("shared:ban:activity:value"),
          value: props.ban.activity
            ? t("shared:ban:activity:yes")
            : t("shared:ban:activity:no"),
        },
        {
          label: t("shared:ban:expires"),
          value: formatISO9075(props.ban.expires),
        },
      ]}
    />
  );
}
