"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiMiniXMark } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

  useLockBodyScroll(isLanguageOpen, isOpen);

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
                <div className=" hover-effects hover:bg-primary/10 p-2 rounded-md">
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
function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <div
      className="bg-black/80 fixed top-0 right-0 left-0 w-full z-20"
      onClick={toggleSidebar}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar" // Key helps AnimatePresence track the component
            initial={{ x: "-100%" }} // Start off-screen
            animate={{ x: 0 }} // Animate in
            exit={{ x: "-100%" }} // Animate out
            transition={{ type: "tween", duration: 0.2 }} // Animation timing
            className="h-screen bg-white w-[75vw] p-5 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <HiMiniXMark
              className="size-6 float-right cursor-pointer text-primary/50 hover-effects hover:text-primary"
              onClick={toggleSidebar}
            />

            <ul className="mt-5">
              <li onClick={toggleSidebar}>
                <Link href="/discover-nano">What is Nano?</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
