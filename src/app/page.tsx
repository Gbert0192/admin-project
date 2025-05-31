import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <h1>Hi, {JSON.stringify(session?.user.name, null, 2)}</h1>
    </>
  );
}
