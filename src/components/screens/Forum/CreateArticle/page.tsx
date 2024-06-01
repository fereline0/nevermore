"use client";

import Input from "@/components/UI/Input/page";
import Section from "@/components/shared/Content/Section/page";
import Form from "@/components/shared/Form/page";
import MarginBottom from "@/components/shared/MarginBottom/page";
import Tiptap from "@/components/shared/TipTap/page";
import { createArticle } from "@/services/article";
import ICategory from "@/types/category.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

interface ICreateArticle {
  category: ICategory;
}

export default function CreateArticle(props: ICreateArticle) {
  const { data: session, status } = useSession();
  const [HTML, setHTML] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  if (status != "authenticated") {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const article = await createArticle(
      event,
      HTML,
      session?.user.id,
      props.category.id
    );

    if (article) {
      router.push(`/forums/${props.category.id}`);
    }
  };

  return (
    <MarginBottom gap={10}>
      <Section padding="5px 10px">
        <p>
          {t("screens:forum:createArticle:title")} {props.category.name}
        </p>
      </Section>
      <Form
        submitValue={t("screens:forum:createArticle:form:submitValue")}
        onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
      >
        <Input
          placeholder={t("screens:forum:createArticle:form:title")}
          name="title"
        />
      </Form>
      <Tiptap setHTML={setHTML} />
    </MarginBottom>
  );
}