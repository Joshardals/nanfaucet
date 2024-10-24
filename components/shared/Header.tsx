"use client";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { PiGlobeBold } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxDividerVertical } from "react-icons/rx";
import { useEffect, useState } from "react";

export function useLockBodyScroll(...openStates: (boolean | null)[]): void {
  useEffect(() => {
    const shouldLockScroll = openStates.some((state) => state); // If any state is true

    if (shouldLockScroll) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openStates]);
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useLockBodyScroll(isOpen, isSearchOpen);

  return (
    <>
      <header className="max-content py-5 space-y-5 text-sm font-medium bg-white fixed top-0 left-0 right-0 ">
        <div className="flex items-center justify-between px-5 md:px-5 md:space-x-5">
          <span className="font-bold text-accent text-base max-md:hidden">
            giftcards
          </span>
          <div className="flex items-center space-x-5">
            <div className=" hover-effects hover:bg-primary/10 p-2 rounded-md">
              <RxHamburgerMenu
                className="size-5 md:hidden cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>

            <span className="text-accent md:hidden">logo</span>
          </div>
          {/* Desktop */}
          <div className="max-md:hidden flex-1">
            <SearchToggle />
          </div>
          <div className="flex items-center space-x-1 text-primary/70">
            <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover-effects hover:text-primary hover:bg-primary/10 rounded-md">
              <PiGlobeBold className="size-5" />
              <span>USD</span>
            </div>
            <RxDividerVertical className="size-5 text-primary/20" />
            <div className="rounded-md p-2 cursor-pointer hover-effects hover:bg-primary/10 hover:text-primary">
              EN
            </div>
          </div>
        </div>

        <div className="px-5 md:hidden" onClick={toggleSearch}>
          <SearchToggle />
        </div>
      </header>

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <SearchBar isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
    </>
  );
}

function SearchBar({
  isSearchOpen,
  toggleSearch,
}: {
  isSearchOpen: boolean;
  toggleSearch: () => void;
}) {
  return (
    <div
      className="bg-black/80 fixed top-0 right-0 left-0 w-full"
      onClick={toggleSearch}
    >
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            key="sidebar" // Key helps AnimatePresence track the component
            initial={{ y: "100%" }} // Start off-screen
            animate={{ y: "25vh" }} // Animate in
            exit={{ y: "100%" }} // Animate out
            transition={{ type: "tween", duration: 0.5 }} // Animation timing
            className="h-screen bg-white font-medium rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-2 px-5 pt-5 pb-2 border-b border-primary/20">
              <IoIosSearch className="size-5 text-primary/50" />
              <input
                type="search"
                title="search"
                placeholder="Search for products"
                className="outline-none py-2 flex-1"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
