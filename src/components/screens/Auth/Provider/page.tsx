"use client";

import { SessionProvider } from "next-auth/react";
import i18n from "@/lang/i18n";
import { I18nextProvider } from "react-i18next";

interface IProvider {
  children: React.ReactNode;
}

export default function Provider(props: IProvider) {
  return (
    <SessionProvider>
      <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>
    </SessionProvider>
  );
}
