"use client";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { PiGlobeBold } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxDividerVertical } from "react-icons/rx";
import { useState } from "react";

export function Header() {
  return (
    <header className="max-content p-5 text-sm font-medium">
      <div className="flex items-center justify-between md:space-x-5">
        <span className="font-bold text-accent text-base max-md:hidden">
          giftcards
        </span>
        <div className="flex items-center space-x-5">
          <RxHamburgerMenu className="size-5 md:hidden cursor-pointer" />
          <span className="text-accent md:hidden">logo</span>
        </div>
        <div className="ring-1 ring-primary/10 bg-primary/[0.02] text-primary/50 cursor-pointer outline-none flex-1 px-4 py-2 rounded-md hover-effects hover:text-primary flex items-center space-x-2 max-md:hidden">
          <IoIosSearch className="size-5" />
          <span>Search for products</span>
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

      <Sidebar />
    </header>
  );
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-black/80 fixed top-0 right-0 left-0 w-full">
      <div className="bg-white h-screen w-[75vw] p-5 font-medium">
        <HiMiniXMark
          className="size-6 float-right cursor-pointer text-primary/50 hover-effects hover:text-primary"
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
}
