import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="space-y-2 mb-5">
        <div className="flex items-center justify-center space-x-2">
          <Image
            src="/logo.png"
            height={100}
            width={100}
            alt="Logo Image"
            className="size-7"
          />
          <span className="font-bold font-lora text-lg">Nano Faucet</span>
        </div>

        <p className="font-medium text-xs text-center">
          Not a Nan Faucet customer yet?{" "}
          <span>
            <Link href="/register" className="text-accent">
              Sign Up
            </Link>
          </span>
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
