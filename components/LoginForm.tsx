"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form } from "./ui/form";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { signInUser } from "@/lib/actions/auth.actions";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

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

  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("password");

  const toggleInputType = () => {
    setEyeOpen(!eyeOpen);
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setError(null);

      const result = await signInUser({
        email: values.email,
        password: values.password,
      });

      if (!result.success) {
        setError(result.msg as string);
        return;
      }
      router.push("/home");
    } catch (error) {
      console.log(`An unexpected error occured: ${error}`);
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    autoCapitalize="none"
                    autoCorrect="off"
                    id="email"
                    placeholder="Email Address"
                    type="email"
                    {...field}
                    onChange={(e) => {
                      form.setValue("email", e.target.value);
                    }}
                    disabled={loading}
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    autoCapitalize="none"
                    autoCorrect="off"
                    id="password"
                    placeholder="Password"
                    type={inputType}
                    {...field}
                    onChange={(e) => {
                      form.setValue("password", e.target.value);
                    }}
                    disabled={loading}
                  />

                  <div
                    className="absolute top-0 right-0 h-full flex items-center px-5 cursor-pointer bg-snow rounded-md select-none"
                    onClick={toggleInputType}
                  >
                    {eyeOpen ? (
                      <FaEyeSlash className="text-onyx/50 text-lg" />
                    ) : (
                      <FaEye className="text-onyx/50 text-lg" />
                    )}
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
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
