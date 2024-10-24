"use client";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { PiGlobeBold } from "react-icons/pi";

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
import { useEffect, useRef, useState } from "react";
import { useLockBodyScroll } from "@/hooks/hooks";

export function Header() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useLockBodyScroll(isLanguageOpen, isOpen, isSearchOpen);

  return (
    <>
      <header className="max-content py-5 space-y-5 text-sm font-medium bg-white fixed top-0 left-0 right-0 ">
        <div className="flex items-center justify-between px-5 md:px-5 md:space-x-5">
          <span className="font-bold text-accent text-base max-md:hidden">
            giftcards
          </span>
          <div className="flex items-center space-x-5" onClick={toggleSidebar}>
            <div className=" hover-effects hover:bg-primary/10 p-2 rounded-md">
              <RxHamburgerMenu className="size-5 md:hidden cursor-pointer" />
            </div>

            <span className="text-accent md:hidden">logo</span>
          </div>
          {/* Desktop */}
          <div className="max-md:hidden flex-1" onClick={toggleSearch}>
            <SearchToggle />
          </div>
          <div className="flex items-center space-x-1 text-primary/70">
            <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover-effects hover:text-primary hover:bg-primary/10 rounded-md">
              <PiGlobeBold className="size-5" />
              <span>XNO/USD</span>
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

        <div className="px-5 md:hidden" onClick={toggleSearch}>
          <SearchToggle />
        </div>
      </header>

      <Language
        isLanguageOpen={isLanguageOpen}
        toggleLanguage={toggleLanguage}
      />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <SearchBar isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
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
      className={`bg-black/80 fixed bottom-0 flex items-center justify-center max-md:p-5 min-h-screen w-full hover-effects
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
              className="bg-accent hover-effects hover:bg-accent/80 text-white px-4 py-2 w-full rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar({
  isSearchOpen,
  toggleSearch,
}: {
  isSearchOpen: boolean;
  toggleSearch: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);
  return (
    <div
      className={`bg-black/80 fixed bottom-0 flex items-center justify-center max-md:p-5 min-h-screen w-full hover-effects
        ${
          isSearchOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } 
        `}
      onClick={toggleSearch}
    >
      <div
        className="font-medium rounded-md bg-white h-[50vh] w-full md:w-[30rem] py-2 space-y-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-2 border-b border-primary/20 px-5">
          <IoIosSearch className="size-5 text-primary/50" />
          <input
            ref={inputRef}
            type="search"
            title="search"
            placeholder="Search for products"
            className="outline-none py-2 flex-1"
          />
        </div>

        <div className="text-primary/50 px-5">
          <span className="text-sm">Categories</span>
        </div>
      </div>
    </div>
  );
}

function SearchToggle() {
  return (
    <div className="ring-1 ring-primary/10 bg-primary/[0.02] text-primary/50 cursor-pointer outline-none px-4 py-2 rounded-md hover-effects hover:text-primary flex items-center space-x-2">
      <IoIosSearch className="size-5" />
      <span>Search for products</span>
    </div>
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
      className="bg-black/80 fixed top-0 right-0 left-0 w-full"
      onClick={toggleSidebar}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar" // Key helps AnimatePresence track the component
            initial={{ x: "-100%" }} // Start off-screen
            animate={{ x: 0 }} // Animate in
            exit={{ x: "-100%" }} // Animate out
            transition={{ type: "tween", duration: 0.5 }} // Animation timing
            className="h-screen bg-white w-[75vw] p-5 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <HiMiniXMark
              className="size-6 float-right cursor-pointer text-primary/50 hover-effects hover:text-primary"
              onClick={toggleSidebar}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
