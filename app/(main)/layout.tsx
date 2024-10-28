import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nano Faucet - Earn Free Nano Cryptocurrency Effortlessly",
  description:
    "Join the Nano Faucet platform to earn free Nano cryptocurrency by referring friends. Claim your airdrop and be part of the growing Nano community today!",
  keywords:
    "Nano, Cryptocurrency, Faucet, Airdrop, Earn Free Nano, Crypto Community",
  authors: { name: "NanoFaucet Team" },
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  return (
    <>
      <Header />
      <div className="mt-[3.4rem]">{children}</div>
      <Footer />
    </>
  );
}
