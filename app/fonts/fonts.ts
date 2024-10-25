import { Roboto, Lora } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-lora",
});
