import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-[3.4rem]">{children}</div>
      <Footer />
    </>
  );
}
