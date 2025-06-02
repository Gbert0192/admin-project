import { auth } from "@/auth";
import React from "react";

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <h1>Hi, {JSON.stringify(session?.user.name, null, 2)}</h1>
    </>
  );
}
