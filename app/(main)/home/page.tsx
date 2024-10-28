import { CiWallet } from "react-icons/ci";
import { GetNano } from "@/components/GetNano";
import Image from "next/image";
import Link from "next/link";
import {
  fetchCurrentUserInfo,
  fetchReferredUsers,
} from "@/lib/actions/database.action";
import Referral from "@/components/Referral";

export default async function Home() {
  const totalReferred = await fetchReferredUsers();
  const { userInfo } = await fetchCurrentUserInfo();
  return (
    <main className=" bg-gradient-to-b from-accent to-accent/80 p-2 text-primary/70">
      <section className="p-5 font-medium space-y-5 bg-white rounded-md min-h-screen">
        <div className="flex justify-self-end">
          <Link href="/claim-faucet" className="text-xs text-accent right-0 ">
            How to receive faucet?
          </Link>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col items-center">
            <Image
              src="/logo.png"
              height={100}
              width={100}
              className="size-10"
              alt="logo"
            />
            <span className="text-2xl font-bold text-primary">Nano Faucet</span>
          </div>
          <p className="text-xs">
            Discover Nano with this free Nano faucet.
            <br />
            Paste your Nano address below to instantly get up to{" "}
            <b className="text-primary">$999</b> worth of Nano for participating
            in the nano ecosystem.
          </p>
        </div>

        <GetNano
          referralCount={totalReferred?.total ?? 0}
          email={userInfo?.email ?? ""}
        />

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-primary">
            <CiWallet className="size-7" />
            <span className="font-bold">Don&apos;t Have a Nano Wallet?</span>
          </div>
          <span className="text-xs">
            Download a free Nano wallet for your address
          </span>

          <div className="grid grid-cols-3 gap-5">
            <Item label="Natrium" href="https://natrium.io/" />
            <Item label="Nault" href="https://nault.cc" />
            <Item label="Nautilus" href="https://nautilus.io" />
          </div>
        </div>

        <div className="ring-2 ring-accent py-2 px-4 rounded-md">
          <span className="text-xs mt-5 font-bold italic">
            “Qualify to receive <span className="text-primary">$999</span> worth
            of nano by making transactions on the nano network and referring
            friends to join the nano ecosystem”
          </span>
        </div>

        {/* Referral Link */}
        <Referral referralCode={userInfo?.referralCode ?? ""} />

        <div>
          <div className=" shadow-lg cursor-pointer bg-white ring-2 ring-accent rounded-lg p-5 flex flex-col items-center space-y-2 transition-all duration-300 ease-in-out hover:scale-105">
            <span className="text-sm text-primary/50">Referred Users</span>
            <span className="text-2xl font-bold text-primary">
              {totalReferred?.total}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

function Item({ label, href }: { label: string; href: string }) {
  return (
    <Link legacyBehavior href={href}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 ease-in-out hover:scale-105 ring-1 ring-primary/20 p-2  rounded-md flex items-center justify-center space-x-2"
      >
        {label}
      </a>
    </Link>
  );
}
