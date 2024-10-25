import { CiWallet } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nano address"
            className="w-full ring-2 ring-accent rounded-md py-2 px-4 outline-none"
          />

          <button
            title="Save Language"
            className="bg-accent hover-effects hover:bg-accent/80 text-white px-4 py-2 w-full rounded-md"
          >
            Get Nano!
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-primary">
            <CiWallet className="size-7" />
            <span>Don&apos;t Have a Nano Wallet?</span>
          </div>
          <span className="text-xs">
            Download a free Nano wallet for your address
          </span>

          <div className="grid grid-cols-3 gap-5">
            <Item label="Natrium" />
            <Item label="Nault" />
            <Item label="Nautilus" />
          </div>
        </div>

        <div className="ring-2 ring-accent py-2 px-4 rounded-md">
          <span className="text-xs mt-5 font-bold italic">
            “Qualify to receive <span className="text-primary">$999</span> worth
            of nano by making transactions on the nano network and referring
            friends to join the nano ecosystem”
          </span>
        </div>
      </section>
    </main>
  );
}

export function Item({ label }: { label: string }) {
  return (
    <div className="ring-1 ring-primary/20 p-2  rounded-md flex items-center justify-center space-x-2">
      <span>{label}</span>
    </div>
  );
}
