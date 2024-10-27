"use client";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";

const BASE_URL = "https://nanfaucet.com/";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast("Referral Link Copied");
    },
    (err) => {
      console.error("Failed to copy: ", err);
    }
  );
};

const Referral = ({ referralCode }: { referralCode: string }) => {
  const refLink = `${BASE_URL}register?ref=${referralCode}`;
  const handleCopy = () => {
    copyToClipboard(refLink);
  };
  return (
    <div className="space-y-2 text-xs">
      <h1 className=" font-semibold capitalize text-primary">
        YOUR REFERRAL LINK
      </h1>
      <div className="space-y-2">
        <p>To copy your referral link, click the button below.</p>
        <div className="w-full bg-snow py-2 px-5 rounded-md cursor-pointer ring-1 ring-accent">
          <p className="text-primary">{refLink}</p>
        </div>
      </div>

      <button
        className="bg-accent text-base hover-effects hover:bg-accent/80 text-white px-4 py-2 w-full rounded-md"
        onClick={handleCopy}
      >
        Copy Link
      </button>

      <ToastContainer />
    </div>
  );
};

export default Referral;
