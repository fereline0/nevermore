"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Input from "@/components/UI/Input/page";
import Form from "@/components/shared/Form/page";
import { useTranslation } from "react-i18next";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  function onSearch(event: React.FormEvent) {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    encodedSearchQuery
      ? router.push(`?q=${encodedSearchQuery}`)
      : router.push(pathname);
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
