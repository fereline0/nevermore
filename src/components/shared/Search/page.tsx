"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Input from "@/components/UI/Input/page";
import Form from "@/components/shared/Form/page";

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
      <Form onSubmit={onSearch} submitValue="Search">
        <Input
          placeholder="Search"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Form>
    </div>
  );
}
