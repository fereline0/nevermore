"use client";

import styles from "./page.module.css";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/UI/Input/page";
import Section from "@/components/shared/Content/Section/page";
import Form from "@/components/shared/Form/page";
import MarginBottom from "@/components/shared/MarginBottom/page";
import IUser from "@/types/user.type";
import { editGeneral } from "@/services/userEdit";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import FitContent from "@/components/shared/FitContent/page";
import Button from "@/components/UI/Button/page";

interface IGeneral {
  user: IUser;
}

export default function General({ user }: IGeneral) {
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });
  const router = useRouter();
  const { t } = useTranslation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const updatedData = await editGeneral(user.id, event);
    const updatedDataToJSON = await updatedData?.json();

    if (!updatedData?.ok) {
      return toast.error(t("edit:errorWhenChanging"));
    }

    setUserData(updatedDataToJSON);
    toast.success(t("edit:successfulChange"));
    router.refresh();
  };

  return (
    <MarginBottom gap={10}>
      <Section padding="5px 10px">
        <h1>{t("screens:users:edit:general:title")}</h1>
        <p>{t("screens:users:edit:general:description")}</p>
      </Section>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <MarginBottom gap={10}>
          <Input
            placeholder={t("screens:users:edit:general:inputs:name")}
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <Input
            placeholder={t("screens:users:edit:general:inputs:email")}
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <FitContent>
            <Button type="submit" value={t("edit:save")} />
          </FitContent>
        </MarginBottom>
      </Form>
    </MarginBottom>
  );
}
