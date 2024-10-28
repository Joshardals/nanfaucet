import "./globals.css";
import type { Metadata } from "next";
import { roboto, lora } from "./fonts/fonts";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Nano Faucet - Earn Free Nano Cryptocurrency Effortlessly",
  description:
    "Join the Nano Faucet platform to earn free Nano cryptocurrency by referring friends. Claim your airdrop and be part of the growing Nano community today!",
};

// Trying to make sure the screen doesn't zoom in.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${roboto.variable} ${lora.variable}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
