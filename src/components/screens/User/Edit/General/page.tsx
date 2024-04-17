"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/UI/Input/page";
import Section from "@/components/shared/Content/Section/page";
import Form from "@/components/shared/Form/page";
import MarginBottom from "@/components/shared/MarginBottom/page";
import IUser from "@/types/user.type";
import { editGeneral } from "@/services/user";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

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
    if (updatedData) {
      setUserData(updatedData);
      toast.success(t("screens:users:edit:successfulChange"));
      router.refresh();
    }
  };

  return (
    <MarginBottom gap={10}>
      <Section padding="5px 10px">
        <h1>{t("screens:users:edit:general:title")}</h1>
        <p>{t("screens:users:edit:general:description")}</p>
      </Section>
      <Form onSubmit={handleSubmit} submitValue={t("screens:users:edit:save")}>
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
        </MarginBottom>
      </Form>
    </MarginBottom>
  );
}
