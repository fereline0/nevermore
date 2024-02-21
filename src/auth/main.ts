"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Policy } from "@/classes/policy";

export default function Main() {
  Policy.define("deleteUser", (data) => {
    const { data: session, status } = useSession();

    const params = useParams();
    const id = Number(params.id);

    return (
      status === "authenticated" &&
      id != session?.user.id &&
      data.role.id < session?.user.role.id
    );
  });
}
