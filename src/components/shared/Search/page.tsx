"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Input from "@/components/UI/Input/page";
import PrimaryButton from "@/components/UI/PrimaryButton/page";

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

  return (
    <div>
      <form onSubmit={onSearch} className={styles.search}>
        <Input
          value={searchQuery}
          placeholder="Search"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <div>
          <PrimaryButton value="Search" />
        </div>
      </form>
    </div>
  );
}
