import "./globals.css";
import type { Metadata } from "next";
import { roboto, lora } from "./fonts/fonts";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Nano Faucet - Earn Free Nano Cryptocurrency Effortlessly",
  description:
    "Join the Nano Faucet platform to earn free Nano cryptocurrency by referring friends and completing simple tasks. Claim your airdrop and be part of the growing Nano community today!",
  keywords:
    "Nano, Cryptocurrency, Faucet, Airdrop, Earn Free Nano, Crypto Community",
  openGraph: {
    title: "Nano Faucet - Earn Free Nano Cryptocurrency Effortlessly",
    description:
      "Join the Nano Faucet platform to earn free Nano cryptocurrency by referring friends and completing simple tasks. Claim your airdrop and be part of the growing Nano community today!",
    url: "https://nanfaucet.com",
    siteName: "Nano Faucet",
    images: [
      {
        url: "https://nanfaucet.com/your-image.jpg",
        width: 800,
        height: 600,
        alt: "Nano Faucet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nano Faucet - Earn Free Nano Cryptocurrency Effortlessly",
    description:
      "Join the Nano Faucet platform to earn free Nano cryptocurrency by referring friends and completing simple tasks. Claim your airdrop and be part of the growing Nano community today!",
    image: "https://nanfaucet.com/your-image.jpg",
  },
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
