"use client";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { FormEvent, useState } from "react";
import { useLockBodyScroll } from "@/hooks/hooks";
import { ToastContainer, toast } from "react-toastify";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast("Transaction Id Copied");
    },
    (err) => {
      console.error("Failed to copy: ", err);
    }
  );
};

export function GetNano() {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");

  useLockBodyScroll(openModal);

  function toggleQr() {
    setIsQrOpen(!isQrOpen);
  }

  function toggleOpenModal() {
    setOpenModal(!openModal);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (address) {
      toggleOpenModal();
    }
  }

  const handleCopy = () => {
    copyToClipboard("nano-7CABATA");
  };

  return (
    <div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nano address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
          className="w-full ring-2 ring-accent rounded-md py-2 px-4 outline-none"
        />

        <button
          title="Get Nano"
          type="submit"
          className="bg-accent hover-effects hover:bg-accent/80 text-white px-4 py-2 w-full rounded-md"
        >
          Get Nano!
        </button>
      </form>

      <div
        className={`fixed bg-black/50 z-10 top-0 left-0 right-0 flex items-center justify-center min-h-screen p-5  ${
          openModal
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } `}
      >
        <div className="bg-white shadow-md rounded-md font-medium w-full p-5 md:w-[30rem] space-y-5">
          <div className="flex items-center justify-between">
            <Link href="/claim-faucet" className="text-xs text-accent right-0 ">
              How to receive faucet?
            </Link>

            <div
              className="bg-primary/10 p-1 rounded-md cursor-pointer"
              onClick={toggleOpenModal}
            >
              <HiMiniXMark className="size-4" />
            </div>
          </div>

          <div>
            <ul className="space-y-5 text-xs">
              <li className="flex items-center space-x-4">
                <div className="size-7 ring-1 ring-primary/20 text-primary/70 rounded-full flex items-center justify-center">
                  <span>1</span>
                </div>
                <span>Referral</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="size-7 ring-1 ring-primary/20 text-primary/70 rounded-full flex items-center justify-center">
                  2
                </div>
                <span>Address Validation</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="size-7 ring-1 ring-primary/20 text-primary/70 rounded-full flex items-center justify-center">
                  3
                </div>
                <span>Airdrop</span>
              </li>
            </ul>
          </div>

          <div
            className="text-accent text-xs flex items-center space-x-2 cursor-pointer w-[fit-content] mx-auto"
            onClick={handleCopy}
          >
            <HiOutlineClipboardDocument className="size-4" />
            <span>nano-7CABATA</span>
          </div>

          <div className="flex justify-center items-center flex-col space-y-2 mx-auto">
            <button
              className="rounded-md ring-1 text-xs ring-primary/20 px-4 py-2 flex justify-center"
              onClick={toggleQr}
            >
              {isQrOpen ? "Hide QRCode" : "Show QRCode"}
            </button>
            {isQrOpen && (
              <Image
                src="/address.jpg"
                width={200}
                height={200}
                alt="Wallet Address"
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
