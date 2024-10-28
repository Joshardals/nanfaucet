import { LoginForm } from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";
// import { getCurrentUser } from "@/lib/actions/auth.actions";
// import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nano Faucet - Earn Free Nano Cryptocurrency Effortlessly",
  description:
    "Join the Nano Faucet platform to earn free Nano cryptocurrency by referring friends. Claim your airdrop and be part of the growing Nano community today!",
  keywords:
    "Nano, Cryptocurrency, Faucet, Airdrop, Earn Free Nano, Crypto Community",
  authors: { name: "NanoFaucet Team" },
};

export default async function page() {
  // const user = await getCurrentUser();
  // if (user) redirect("/home");
  return (
    <div>
      <div className="space-y-2 mb-5">
        <div className="flex items-center justify-center space-x-2">
          <Image
            src="/logo.png"
            height={100}
            width={100}
            alt="Logo Image"
            className="size-7"
          />
          <span className="font-bold font-lora text-lg">Nano Faucet</span>
        </div>

        <p className="font-medium text-xs text-center">
          Not a Nano Faucet customer yet?{" "}
          <span>
            <Link href="/register" className="text-accent">
              Sign Up
            </Link>
          </span>
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
