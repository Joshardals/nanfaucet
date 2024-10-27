import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <>
      <Header />
      <div className="mt-[3.4rem]">{children}</div>
      <Footer />
    </>
  );
}
