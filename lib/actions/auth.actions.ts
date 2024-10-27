"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "@/lib/appwrite.config";
import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";
import { createUserInfo } from "./database.action";

// Utility Function to generate a referral code
const generateReferralCode = (): string => {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const nanoid = customAlphabet(alphabet, 8); // You can adjust the length of the code as needed
  return nanoid();
};

export interface CurrentUser {
  email: string;
}

export async function getCurrentUser(): Promise<CurrentUser | string> {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    // Ensure the user is cast to CurrentUser
    return user as CurrentUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message; // Return the error message as a string
    }
    return "Unknown error occurred";
  }
}
export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ success: boolean; msg?: string }> {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("userSession", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // If Successful
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, msg: error.message };
    }
    return { success: false, msg: "Unknown error occurred" };
  }
}

// Creating A User
export async function registerUser({
  email,
  password,
  referredBy,
  nanoWallet,
}: {
  email: string;
  password: string;
  referredBy: string;
  nanoWallet: string;
}): Promise<{ success: boolean; msg?: string }> {
  try {
    const { account } = await createAdminClient();
    const response = await account.create(ID.unique(), email, password);
    const userId = response.email;
    const referralCode = generateReferralCode(); // Generate an 8-digit unique referral code upon sign-up

    // Creating a User collection in the database.
    await createUserInfo({
      email,
      nanoWallet,
      createdAt: response.$createdAt,
      userId,
      referralCode,
      referredBy,
    });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      return { success: false, msg: error.message };
    }
    console.log(`Error: Unknown error occurred`);
    return { success: false, msg: "Unknown error occurred" };
  }
}

// Sign Out User
export async function signOutUser(): Promise<void> {
  try {
    const { account } = await createSessionClient();
    (await cookies()).delete("userSession");
    await account.deleteSession("current");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error during sign out: ${error.message}`);
    } else {
      console.log(`Error during sign out: Unknown error occurred`);
    }
  }

  redirect("/login");
}
