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

export async function getCurrentUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return error;
  }
}

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email!, password!);

    (await cookies()).set("userSession", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // If Successful
    return { success: true };
  } catch (error) {
    return { success: false, msg: error };
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
}) {
  try {
    const { account } = await createAdminClient();
    const response = await account.create(ID.unique(), email!, password!);
    const userId = response.email;
    const referralCode = generateReferralCode(); // Generate an 8 digit unique referral code upon sign up

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
  } catch (error) {
    console.log(`Error: ${error}`);
    return { success: false, msg: error };
  }
}

// Sign Out User

export async function signOutUser() {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete("userSession");
    await account.deleteSession("current");
  } catch (error) {
    return error;
  }

  redirect("/login");
}
