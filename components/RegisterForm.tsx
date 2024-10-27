"use client";

import { FormInput } from "./FormInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Form } from "./ui/form";
import { FaSpinner } from "react-icons/fa6";

const formSchema = z.object({
  email: z.string().email(),
  nanoWallet: z
    .string()
    .min(3, "Invalid Address! must be at least 3 characters long")
    .max(100, ""),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot exceed 20 characters"),
});

export function RegisterForm() {
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const referralParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      nanoWallet: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setError(null); // Clear previous errors

      const result = await registerUser({
        email: values.email,
        password: values.password,
        nanoWallet: values.nanoWallet,
        referredBy: referralParams.get("ref") || "none",
      });

      if (!result.success) {
        setError(result.msg);
        return;
      }
      router.push("/");
    } catch (error: any) {
      console.log(`Error signing up: ${error.message}`);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        autoComplete="off"
      >
        <FormInput
          form={form}
          name="email"
          type="email"
          placeholder="Email Address"
          loading={loading}
        />
        <FormInput
          form={form}
          name="nanoWallet"
          type="text"
          placeholder="Nano Wallet Address"
          loading={loading}
        />
        <FormInput
          form={form}
          name="password"
          type="password"
          placeholder="Password"
          loading={loading}
        />

        {error && <p className="text-red-500 font-medium text-xs">{error}</p>}

        <button
          title="Save Language"
          className="bg-accent hover-effects hover:bg-accent/80 text-white px-4 py-2 w-full rounded-md"
          disabled={loading}
        >
          {loading ? <FaSpinner className=" animate-spin" /> : "Sign Up"}
        </button>
      </form>
    </Form>
  );
}
