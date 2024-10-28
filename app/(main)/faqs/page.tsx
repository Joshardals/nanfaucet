import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nano Faucet - Earn Free Nano Cryptocurrency Effortlessly",
  description:
    "Join the Nano Faucet platform to earn free Nano cryptocurrency by referring friends. Claim your airdrop and be part of the growing Nano community today!",
  keywords:
    "Nano, Cryptocurrency, Faucet, Airdrop, Earn Free Nano, Crypto Community",
  authors: { name: "NanoFaucet Team" },
};

import { QuestionBank } from "@/components/QuestionBank";

export default function page() {
  return (
    <main className="bg-gradient-to-b from-accent to-accent/80 p-2 text-primary/70">
      <section className="font-medium bg-white rounded-md min-h-screen space-y-5 p-5">
        <QuestionBank />
        {/* <h1>Hey there</h1> */}
      </section>
    </main>
  );
}
