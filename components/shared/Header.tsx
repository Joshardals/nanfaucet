"use client";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { PiGlobeBold } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxDividerVertical } from "react-icons/rx";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="max-content py-5 space-y-5 text-sm font-medium bg-white fixed top-0 left-0 right-0 ">
        <div className="flex items-center justify-between px-6 md:space-x-5">
          <span className="font-bold text-accent text-base max-md:hidden">
            giftcards
          </span>
          <div className="flex items-center space-x-5">
            <RxHamburgerMenu
              className="size-5 md:hidden cursor-pointer"
              onClick={toggleSidebar}
            />
            <span className="text-accent md:hidden">logo</span>
          </div>
          {/* Desktop */}
          <div className="max-md:hidden">
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

        <div className="px-5 md:hidden">
          <SearchToggle />
        </div>
      </header>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

function SearchToggle() {
  return (
    <div className="ring-1 ring-primary/10 bg-primary/[0.02] text-primary/50 cursor-pointer outline-none flex-1 px-4 py-2 rounded-md hover-effects hover:text-primary flex items-center space-x-2">
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
