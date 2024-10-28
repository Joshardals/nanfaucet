"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "@/lib/appwrite.config";
import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";
import { createUserInfo } from "./database.action";
import { sendMail } from "./mail.action";

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
      hasReceivedAirdropEmail: false,
    });

    // Send a mail to the admin.
    await sendMail({
      to: "irisinvest041@gmail.com",
      subject: `New User Registration: ${email}`,
      body: `<p>Hello Admin,</p>

      <p>A new user has just signed up on NanoFaucet.</p>

      <p><strong>User Details:</strong></p>
      <ul>
        <li>Email: ${email}</li>
      </ul>

      <p>Please ensure they receive a warm welcome and any necessary assistance to help them get started smoothly on our platform.</p>

      <p>Best regards,</p>
      <p>The NanoFaucet System</p>
      `,
    });

    // Send a mail to the customer.
    await sendMail({
      to: email!,
      subject: `Welcome to Nano Faucet, ${email}!`,
      body: `<p>Hello ${email},</p>

      <p>Welcome to NanoFaucet! We’re excited to   have you here as part of the Nano community.</p>
      
      <p>Your account is ready, and you can now start receiving Nano instantly. Simply paste your Nano address on our platform to access up to $999 worth of Nano and experience feeless, instant transactions on the Nano network.</p>
      
      <p>If you’d like to maximize your rewards, refer friends and make transactions on the Nano network to qualify for even more Nano in future airdrops.</p>
      
      <p>If you have any questions or need support, don’t hesitate to reach out. Enjoy exploring the Nano ecosystem!</p>
      
      <p>Best regards,</p>
      <p>The NanoFaucet Team</p>`,
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

  redirect("/");
}
