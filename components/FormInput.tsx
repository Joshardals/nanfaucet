import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface FormInputProps {
  form?: UseFormReturn<{
    password: string;
    email: string;
    nanoWallet: string;
  }>;
  name?: "email" | "nanoWallet" | "password"; // Typing name more strictly
  type?: string;
  placeholder?: string;
  loading?: boolean;
}

export function FormInput({
  form,
  name,
  type,
  placeholder,
  loading,
}: FormInputProps) {
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type!);

  const toggleInputType = () => {
    setEyeOpen(!eyeOpen);
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return form ? (
    <FormField
      control={form.control}
      name={name!}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                autoCapitalize="none"
                autoComplete={type === "password" ? "new-password" : "off"}
                autoCorrect="off"
                id={name!}
                placeholder={placeholder}
                type={inputType}
                {...field}
                onChange={(e) => {
                  form.setValue(name!, e.target.value);
                }}
                disabled={loading}
              />

              {type === "password" && (
                <div
                  className="absolute top-0 right-0 h-full flex items-center px-5 cursor-pointer bg-snow rounded-md select-none"
                  onClick={toggleInputType}
                >
                  {eyeOpen ? (
                    <FaEyeSlash className="text-onyx/50 text-lg" />
                  ) : (
                    <FaEye className=" text-onyx/50 text-lg" />
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500 text-xs font-normal" />
        </FormItem>
      )}
    />
  ) : null;
}
