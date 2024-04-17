"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/UI/Input/page";
import Section from "@/components/shared/Content/Section/page";
import Form from "@/components/shared/Form/page";
import MarginBottom from "@/components/shared/MarginBottom/page";
import IUser from "@/types/user.type";
import { editGeneral } from "@/services/user";

interface IGeneral {
  user: IUser;
}

export default function General({ user }: IGeneral) {
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedData = await editGeneral(user.id, event);
    if (updatedData) {
      setUserData(updatedData);
      router.refresh();
    }
  };

  return (
    <MarginBottom gap={10}>
      <Section padding="5px 10px">
        <h1>General</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
          fugit eum, quisquam veniam rem obcaecati eaque ratione placeat cum
          necessitatibus itaque eligendi aspernatur, similique dolor architecto
          dolorum libero consectetur ullam.
        </p>
      </Section>
      <Form onSubmit={handleSubmit} submitValue="Save">
        <MarginBottom gap={10}>
          <Input
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Email"
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
