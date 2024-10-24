"use client";
import Image from "next/image";
import { FaSlidersH } from "react-icons/fa";
import { motion } from "framer-motion";
import { PiCardsLight } from "react-icons/pi";
import { Ratings } from "./Ratings";

export function GiftCards() {
  return (
    <section className="p-5 font-medium max-content space-y-5">
      <div className="flex items-center space-x-4">
        <Image
          src="card.svg"
          height={50}
          width={50}
          className="size-7"
          alt="card svg"
        />
        <span className="text-lg capitalize">all gift cards</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 bg-accent/80 hover-effects hover:bg-accent text-white px-4 py-2 rounded-md cursor-pointer">
          <FaSlidersH className="size-4" />
          <span>Filters</span>
        </div>
        <span>Result found: 1000</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5">
        <Card />
      </div>
    </section>
  );
}

function Card() {
  return (
    <motion.div
      className="cursor-pointer border rounded-md border-primary/20"
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src="/steam.png"
        width={500}
        height={500}
        alt="Steam"
        className="rounded-tr-md rounded-tl-md w-full object-cover"
      />

      <div className="p-2 space-y-1">
        <span>Steam</span>
        <Ratings rating={4.5} />
      </div>
    </motion.div>
  );
}
