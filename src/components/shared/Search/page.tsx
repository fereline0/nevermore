"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Input from "@/components/UI/Input/page";
import Form from "@/components/shared/Form/page";
import { useTranslation } from "react-i18next";
import Button from "@/components/UI/Button/page";
import FitContent from "@/components/shared/FitContent/page";

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
      <Form onSubmit={onSearch} className={styles.form}>
        <Input
          placeholder={t("shared:search")}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <FitContent>
          <Button type="submit" value={t("shared:search")} />
        </FitContent>
      </Form>
    </div>
  );
}
