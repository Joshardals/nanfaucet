import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nano Faucet - Earn Free Nano Cryptocurrency Effortlessly",
  description:
    "Join the Nano Faucet platform to earn free Nano cryptocurrency by referring friends. Claim your airdrop and be part of the growing Nano community today!",
  keywords:
    "Nano, Cryptocurrency, Faucet, Airdrop, Earn Free Nano, Crypto Community",
  authors: "NanoFaucet Team",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen max-sm:p-5">
      <div className="bg-white shadow-md p-5 rounded-xl w-full sm:w-96">
        {children}
      </div>
    </div>
  );
}
