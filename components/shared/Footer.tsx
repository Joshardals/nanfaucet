import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";

export function Footer() {
  return (
    <footer className="flex flex-col items-center font-medium p-5">
      <span className="text-base">Nano Faucet © 2024 </span>

      <div className="flex items-center text-accent">
        <Link href="privacy-policy" className="text-xs">
          Privacy Policy
        </Link>
        <RxDividerVertical className="size-5 text-primary/20" />
        <Link href="/terms-of-service" className="text-xs">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
