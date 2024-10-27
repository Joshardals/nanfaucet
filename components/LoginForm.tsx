"use client";
import { FormInput } from "./FormInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form } from "./ui/form";
import { FaSpinner } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { signInUser } from "@/lib/actions/auth.actions";

export function LoginForm() {
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required field").max(20),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setError(null);

      const result = await signInUser({
        email: values.email,
        password: values.password,
      });

      if (!result.success) {
        setError(result.msg);
        return;
      }
      router.push("/home");
    } catch (error: any) {
      console.log(`An unexpected error occured: ${error.message}`);
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
          name="password"
          type="password"
          placeholder="Password"
          loading={loading}
        />

        {error && <p className="text-red-500 font-medium text-xs">{error}</p>}

        <button
          title="Save Language"
          className={`bg-accent hover-effects hover:bg-accent/80 text-white px-4 py-2 w-full rounded-md flex justify-center ${
            loading && "bg-accent/80"
          }`}
          disabled={loading}
        >
          {loading ? <FaSpinner className=" animate-spin" /> : "Login"}
        </button>
      </form>
    </Form>
  );
}
