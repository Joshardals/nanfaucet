"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { CiWallet } from "react-icons/ci";
import { FiHelpCircle } from "react-icons/fi";

import Image from "next/image";
import Link from "next/link";

import { MdOutlineWaterDrop } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxDividerVertical } from "react-icons/rx";
import { useLockBodyScroll } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  const fetchPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=nano&vs_currencies=usd"
      );
      const data = await response.json();
      setPrice(data.nano.usd);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useLockBodyScroll(isLanguageOpen);

  useEffect(() => {
    fetchPrice(); // Fetch price initially

    const interval = setInterval(() => {
      fetchPrice(); // Auto-refresh price every 10 seconds
    }, 10000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <>
      <header className="py-2 text-sm font-medium bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="max-content space-y-5">
          <div className="flex items-center justify-between px-5 md:px-5 md:space-x-5">
            <div className="max-md:hidden">
              <Logo />
            </div>
            <div className="flex items-center space-x-2">
              <div onClick={toggleSidebar}>
                <div
                  className={`hover-effects hover:bg-primary/10 p-2 rounded-md ${
                    isOpen && "bg-primary/10"
                  }`}
                >
                  <RxHamburgerMenu className="size-5 md:hidden cursor-pointer" />
                </div>
              </div>
              <div className="md:hidden">
                <Logo />
              </div>
            </div>
            <div className="flex items-center space-x-1 text-primary/70">
              <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover-effects hover:text-primary hover:bg-primary/10 rounded-md">
                <span>XNO/USD</span>
                {price !== null ? (
                  <span className="text-primary">${price.toFixed(2)}</span>
                ) : (
                  <AiOutlineLoading3Quarters className=" animate-spin" />
                )}
              </div>
              <RxDividerVertical className="size-5 text-primary/20" />
              <div
                className="rounded-md p-2 cursor-pointer hover-effects hover:bg-primary/10 hover:text-primary"
                onClick={toggleLanguage}
              >
                EN
              </div>
            </div>
          </div>
        </div>
      </header>

      <Language
        isLanguageOpen={isLanguageOpen}
        toggleLanguage={toggleLanguage}
      />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

function Language({
  isLanguageOpen,
  toggleLanguage,
}: {
  isLanguageOpen: boolean;
  toggleLanguage: () => void;
}) {
  return (
    <div
      className={`bg-black/80 fixed z-20 bottom-0 flex items-center justify-center max-md:p-5 min-h-screen w-full hover-effects
        ${
          isLanguageOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } 
        `}
      onClick={toggleLanguage}
    >
      <div
        className="font-medium rounded-md bg-white w-full p-5 md:w-[30rem] space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-md:text-center">
          <span className="text-lg">Select your language</span>
          <div className="text-primary/50 text-sm">
            <span>Select your preferred language for the website.</span>
          </div>
        </div>

        <div className="max-md:mx-auto max-md:max-w-sm space-y-2">
          <span>Language</span>

          <div className="space-y-5">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>English</SelectLabel>
                  <SelectItem value="spanish">Español</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="italiano">Italiano</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <button
              title="Save Language"
              className="bg-accent/80 hover-effects hover:bg-accent text-white px-4 py-2 w-full rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link className="flex items-center space-x-2 cursor-pointer" href="/">
      <Image
        src="/logo.png"
        height={100}
        width={100}
        alt="Logo Image"
        className="size-7"
      />
      <span className="font-bold font-lora text-accent text-lg max-md:hidden">
        nano faucet
      </span>
    </Link>
  );
}

const sidebarLinks = [
  {
    label: "Nano Faucet",
    href: "/",
    icon: <MdOutlineWaterDrop className="size-4" />,
  },
  {
    label: "What is Nano?",
    href: "/discover-nano",
    icon: <FiHelpCircle className="size-4" />,
  },
  {
    label: "Wallets",
    href: "#",
    icon: <CiWallet className="size-4" />,
  },
];

function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const pathname = usePathname();

  const toggleWallet = () => {
    setIsWalletOpen(!isWalletOpen);
  };
  return (
    <div className="relative">
      <div
        className={`bg-white rounded-md hover-effects fixed mx-7 py-1 shadow-md ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } `}
      >
        <ul className="space-y-2">
          {sidebarLinks.map(
            (
              item: { label: string; href: string; icon: JSX.Element },
              index
            ) => (
              <li
                key={index}
                onClick={() => {
                  if (item.label === "Wallets") {
                    toggleWallet();
                    return;
                  }
                  toggleSidebar();
                  setIsWalletOpen(false);
                }}
                className={`hover:bg-accent/10 hover:text-accent hover-effects justify-between p-2 w-40 ${
                  item.label === "Wallets" && isWalletOpen
                    ? "bg-accent/10 text-accent"
                    : pathname === item.href && !isWalletOpen
                    ? "bg-accent/10 text-accent"
                    : null
                }`}
              >
                <Link href={item.href} className="flex items-center space-x-4">
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.label === "Wallets" && (
                    <FiArrowRight className="size-4" />
                  )}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
      <div
        className={`bg-white hover-effects fixed top-36 left-48 rounded-md shadow-md p-2 w-28  ${
          isWalletOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } `}
      >
        <ul className="space-y-2">
          <li className="p-2">Natrium</li>
          <li className="p-2">Nault</li>
          <li className="p-2">Nautilus</li>
        </ul>
      </div>
    </div>
  );
}
