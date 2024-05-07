"use client";

import Input from "@/components/UI/Input/page";
import Form from "@/components/shared/Form/page";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ISearch {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchParams: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search(props: ISearch) {
  const [searchQuery, setSearchQuery] = useState("");

  function onSearch(event: React.FormEvent) {
    event.preventDefault();
    props.setSearchParams(encodeURI(searchQuery));
    props.setPage(1);
  }

  const { t } = useTranslation();

  return (
    <div>
      <Form onSubmit={onSearch} submitValue={t("shared:search")}>
        <Input
          placeholder={t("shared:search")}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Form>
    </div>
  );
}
